import { createClient } from '@/utils/supabase/server';
import ImpactClient from '@/components/ImpactClient';

export default async function ImpactPage() {
  const supabase = await createClient();
  
  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: winnings } = await supabase.from('winnings').select('amount');
  const totalRaised = winnings?.reduce((sum, w) => sum + Number(w.amount), 0) || 0;
  // Let's assume 35% of total winnings are matched as donations
  const charitableDonationTotal = totalRaised > 0 ? totalRaised * 0.35 : 842100;

  return <ImpactClient charities={charities} charitableDonationTotal={charitableDonationTotal} />;
}
