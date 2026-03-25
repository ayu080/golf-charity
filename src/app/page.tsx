import { createClient } from '@/utils/supabase/server';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch active members count
  const { count: activeMembersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  // Fetch top 2 charities
  const { data: charities } = await supabase
    .from('charities')
    .select('name')
    .limit(2);

  return <HomeClient activeMembersCount={activeMembersCount} charities={charities} />;
}
