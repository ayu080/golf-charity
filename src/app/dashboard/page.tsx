import Image from "next/image";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, charities(name)')
    .eq('id', user.id)
    .single();

  const { data: winnings } = await supabase
    .from('winnings')
    .select('amount')
    .eq('user_id', user.id)
    .eq('status', 'paid');
    
  const totalWinnings = winnings?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  const { data: scores } = await supabase
    .from('scores')
    .select('score, date')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(5);

  async function submitScore(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const score = parseInt(formData.get('score') as string, 10);
    if (!score || score < 1 || score > 45) return;
    
    // Default to current date for now
    const date = new Date().toISOString().split('T')[0];
    
    await supabase.from('scores').insert({ 
      user_id: user.id, 
      score, 
      date 
    });
    
    revalidatePath('/dashboard');
  }

  const firstName = profile?.first_name || 'Golfer';
  const lastName = profile?.last_name || '';
  // charities join result depends on single vs many. Assuming charities is an object if 1:1, or array if M:1 setup wrongly.
  const currentCharity = profile?.charities?.name || 'Your Chosen Charity';
  const donationPercent = profile?.charity_contribution_percentage || 10;
  const status = profile?.subscription_status || 'inactive';
  
  return (
    <>
      <header className="bg-[#f9f9f9] dark:bg-[#181f21] text-[#2d3436] dark:text-[#f3f3f3] docked full-width top-0 no-border tonal-shift flat no-shadows flex justify-between items-center w-full px-6 py-4 sticky z-50">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-2xl hover:opacity-80 transition-opacity">menu</button>
          <h1 className="text-xl font-extrabold tracking-tighter text-[#181f21] dark:text-white font-headline">The Fairway Collective</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-[#2d3436] dark:text-white font-bold font-headline text-sm">
            <Link className="text-[#2d3436] dark:text-white font-bold transition-opacity hover:opacity-80" href="/dashboard">Dashboard</Link>
            <Link className="text-gray-500 dark:text-gray-400 transition-opacity hover:opacity-80" href="/scores">Scores</Link>
            <Link className="text-gray-500 dark:text-gray-400 transition-opacity hover:opacity-80" href="/impact">Impact</Link>
          </nav>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
            <img alt="User profile" className="w-full h-full object-cover" data-alt="close-up portrait of a professional man in a tailored dark polo shirt against a minimalist grey background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5BKnI_6hF6tGBrhrEHGnnPsGsTHv31adGkHiLLFoFUV9Nf5x2spTYBMvWDj1I0F3cDooID_kG-q8gh2A6CMt8xCoTAA8RyV_A9bGuXNuPxdAJcNPUS27FlCYLkYoL8K8ljVEXkkRAHtlaZbZwil-QooKC__4n0Bd1DMnRiEghWUHASZKnmhozO6wFaf0xp4dINcF02sTzBKYLWuojUtFoIKd-N4JGcH_XISYKln7QTp--opd3C1RMqRnoKaQEqe4Q-BUD8BuMBlb2" />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <span className="font-headline font-bold uppercase tracking-widest text-secondary text-sm mb-4 block">Personal Workspace</span>
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-primary leading-none">
              Good morning, <br />{firstName} {lastName}.
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end">
            <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow w-full max-w-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {status === 'active' && (
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                  )}
                  <span className="font-headline font-bold text-sm tracking-tight">{status === 'active' ? 'Active Membership' : 'Inactive Membership'}</span>
                </div>
                <p className="text-xs text-on-surface-variant font-medium">Status: {status}</p>
              </div>
              <Link href="/impact" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_forward_ios</Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img alt="Charity partner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="abstract artistic shot of clean water ripples in a deep emerald pool with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc_q24MSjqyXJeb0H32EHPUndBH4pCvjzgv7hbQq9MgPjlPXkJe07s7nQjXCtzU4vQDooZSFfMlM0QARLlWa7GngwzFZbU9ltQJhVXBN4M45a5RMuSxTr5jBeJ01YsrhgrKJJl5V_pVEMYl9EwNKK_sM5hDHWmwsfyK7JpxVABE8HZ2GvhOySM6rUNMMMs9rTjMsFTNph2f26hI6_lh1gR43zIEWodqyZ1JF4MRvh6A7x6zAzU53dauvox_OwumKFoeBYH3ff0MP2E" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8">
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1 block">Current Impact Partner</span>
                  <h3 className="text-3xl font-headline font-bold text-white">{currentCharity}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm text-on-surface-variant mb-1 font-medium">Your Donation Preference</p>
                    <span className="text-2xl font-headline font-bold text-primary">{donationPercent}% <span className="text-sm font-normal text-on-surface-variant">of winnings</span></span>
                  </div>
                  <span className="text-secondary font-headline font-bold text-sm">Active</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full mb-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full" style={{ width: `${Math.max(10, donationPercent)}%` }}></div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-headline font-bold text-sm">Adjust Donation %</label>
                    <span className="text-secondary font-bold">{donationPercent}%</span>
                  </div>
                  <input className="w-full h-1 bg-surface-container-high appearance-none rounded-full accent-secondary cursor-pointer" max="100" min="10" type="range" defaultValue={donationPercent} />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">
                    <span>10% Baseline</span>
                    <span>100% Max Impact</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary silk-gradient p-8 rounded-xl text-white ambient-shadow flex flex-col justify-between aspect-square md:aspect-auto">
                <div>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-6">Total Winnings</span>
                  <div className="text-6xl font-headline font-extrabold tracking-tighter mb-2">£{totalWinnings.toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary/20 text-secondary-fixed text-[10px] px-2 py-0.5 rounded-full font-bold border border-secondary/30 uppercase tracking-widest">Paid</span>
                    <span className="text-white/40 text-[10px] font-medium uppercase tracking-widest">All time rewards</span>
                  </div>
                </div>
                <Link href="/scores" className="mt-8 flex items-center justify-between w-full group">
                  <span className="font-headline font-bold text-sm text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest">Full Activity Ledger</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors border border-outline-variant/30 rounded-full p-2 group-hover:border-primary/30">east</span>
                </Link>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow flex flex-col">
                <h4 className="font-headline font-bold text-lg mb-6">Upcoming Draws</h4>
                <div className="space-y-6 flex-grow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined" data-weight="fill">workspace_premium</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-bold text-primary">The Founders Open</p>
                      <p className="text-xs text-on-surface-variant">Nov 24 • Entry Confirmed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">event</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-bold text-primary">Winter Equinox Draw</p>
                      <p className="text-xs text-on-surface-variant">Dec 21 • Registration Open</p>
                    </div>
                  </div>
                </div>
                <a href="mailto:verify@fairwaycollective.org" className="w-full mt-6 py-4 bg-secondary-container text-on-secondary-container rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg" data-icon="add_a_photo">add_a_photo</span>
                  Submit Proof of Play
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow">
              <h3 className="font-headline font-bold text-xl mb-8">Log Performance</h3>
              <form action={submitScore} className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Stableford Score</label>
                  <input name="score" required className="w-full bg-surface-container-high border-0 border-b-2 border-outline-variant rounded-t-lg p-4 text-3xl font-headline font-extrabold focus:ring-0 focus:border-primary transition-colors" max="45" min="1" placeholder="00" type="number" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Play Date</label>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-not-allowed opacity-70">
                    <span className="font-medium text-sm">Today</span>
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-headline font-bold text-sm silk-gradient hover:scale-[0.98] duration-200 transition-all">
                  Submit Entry
                </button>
              </form>
              
              <div className="mt-12">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-6 pb-2 border-b border-surface-container">Recent Activity</h4>
                <div className="space-y-4">
                  {scores && scores.length > 0 ? scores.map((s, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                      <span className="text-xs font-medium text-on-surface-variant">{new Date(s.date).toLocaleDateString()}</span>
                      <span className="font-headline font-bold text-primary group-hover:text-secondary transition-colors">{s.score}pts</span>
                    </div>
                  )) : (
                    <p className="text-sm text-on-surface-variant italic">No recent scores logged.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl border-l-4 border-secondary bg-secondary-container/20 italic font-body text-sm text-on-secondary-fixed-variant leading-relaxed">
              &quot;True competition is only ever with yourself. The collective grows when we each strive for our best, on and off the course.&quot;
            </div>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pb-safe pt-2 px-4 bg-[#f9f9f9]/80 dark:bg-[#181f21]/80 backdrop-blur-xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] border-t-[0.5px] border-black/5">
        <Link className="flex flex-col items-center justify-center text-[#181f21] dark:text-white font-bold transition-all duration-300 ease-in-out" href="/dashboard">
          <span className="material-symbols-outlined" data-weight="fill">dashboard</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest mt-1">Dashboard</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-300 ease-in-out hover:text-[#2d3436] dark:hover:text-white" href="/scores">
          <span className="material-symbols-outlined mb-1 text-2xl" data-icon="leaderboard">leaderboard</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Rank</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-300 ease-in-out hover:text-[#2d3436] dark:hover:text-white" href="/impact">
          <span className="material-symbols-outlined mb-1 text-2xl" data-icon="public">public</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Impact</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-300 ease-in-out hover:text-[#2d3436] dark:hover:text-white" href="/dashboard">
          <span className="material-symbols-outlined mb-1 text-2xl" data-icon="settings">settings</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Settings</span>
        </Link>
      </nav>
    </>
  );
}
