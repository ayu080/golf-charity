-- Create charities table
CREATE TABLE public.charities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user'::text CHECK (role IN ('user', 'admin')),
    charity_id UUID REFERENCES public.charities(id),
    charity_contribution_percentage INTEGER DEFAULT 10 CHECK (charity_contribution_percentage >= 10 AND charity_contribution_percentage <= 100),
    subscription_status TEXT DEFAULT 'inactive'::text CHECK (subscription_status IN ('active', 'inactive', 'canceled', 'trailing')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Golf scores table
CREATE TABLE public.scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Draws table
CREATE TABLE public.draws (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    month TEXT NOT NULL, -- Format 'YYYY-MM'
    winning_numbers INTEGER[] CHECK (array_length(winning_numbers, 1) = 5),
    status TEXT DEFAULT 'simulated'::text CHECK (status IN ('simulated', 'published')),
    jackpot_rolled_over BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Winnings table
CREATE TABLE public.winnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    match_type INTEGER NOT NULL CHECK (match_type IN (3, 4, 5)),
    status TEXT DEFAULT 'pending'::text CHECK (status IN ('pending', 'paid', 'verified')),
    proof_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS setup
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winnings ENABLE ROW LEVEL SECURITY;

-- Charities Policies: Public read, Admin write
CREATE POLICY "Charities are viewable by everyone." ON public.charities FOR SELECT USING (true);

-- Profiles Policies: User can read/update own, Admin can read/update all
CREATE POLICY "Users can view own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Scores Policies: User can read/write own, Admin can read all
CREATE POLICY "Users can view own scores." ON public.scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores." ON public.scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own scores." ON public.scores FOR DELETE USING (auth.uid() = user_id);

-- Trigger to maintain only latest 5 scores per user
CREATE OR REPLACE FUNCTION maintain_latest_five_scores()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.scores
  WHERE user_id = NEW.user_id
  AND id NOT IN (
    SELECT id FROM public.scores 
    WHERE user_id = NEW.user_id 
    ORDER BY date DESC, created_at DESC 
    LIMIT 5
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_maintain_scores
AFTER INSERT ON public.scores
FOR EACH ROW
EXECUTE FUNCTION maintain_latest_five_scores();

-- Trigger to create profile after user sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
