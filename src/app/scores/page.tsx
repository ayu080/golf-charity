import { createClient } from '@/utils/supabase/server';
import ScoresClient from '@/components/ScoresClient';

export default async function LeaderboardPage() {
  const supabase = await createClient();
  
  const { data: scores } = await supabase
    .from('scores')
    .select('*, profiles(full_name, avatar_url)')
    .order('par_score', { ascending: true })
    .limit(10);

  return <ScoresClient scores={scores} />;
}
