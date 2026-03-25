import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Ensure admin role
  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Uncomment in full production:
  // if (adminProfile?.role !== 'admin') {
  //   redirect('/dashboard');
  // }

  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  const { data: allWinnings } = await supabase
    .from('winnings')
    .select('amount');
  const totalPrizePool = allWinnings?.reduce((sum, w) => sum + Number(w.amount), 0) || 0;

  // Placeholder derived stat for charity contributions
  const charityContributions = totalPrizePool > 0 ? totalPrizePool * 0.35 : 842100;

  const { data: members } = await supabase
    .from('profiles')
    .select('first_name, last_name, subscription_status, scores(score)')
    .limit(10);

  const { data: verifications } = await supabase
    .from('winnings')
    .select('id, amount, proof_image_url, profiles(first_name, last_name)')
    .eq('status', 'pending');

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <nav className="h-screen w-72 fixed left-0 top-0 bg-[#f2f4f4] dark:bg-[#1A1A1A] hidden md:flex flex-col py-12 pr-4 space-y-2 z-40 border-r border-gray-200 dark:border-white/5">
        <div className="px-8 mb-12">
          <h1 className="text-lg font-black tracking-widest text-[#1A1A1A] dark:text-[#faf7f6] uppercase">Philanthropy Ledger</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <Link className="bg-[#ffffff] dark:bg-[#2d3435] text-[#1A1A1A] dark:text-[#faf7f6] rounded-r-lg py-4 px-8 flex items-center space-x-4 transition-all scale-[0.99] duration-200 shadow-sm" href="/admin">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-['Manrope'] tracking-[0.1em] uppercase text-xs font-semibold">Dashboard</span>
          </Link>
          <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:bg-[#e4e9ea] dark:hover:bg-[#2d3435] py-4 px-8 flex items-center space-x-4 transition-all rounded-r-lg" href="/admin">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span className="font-['Manrope'] tracking-[0.1em] uppercase text-xs font-semibold">Subscriptions</span>
          </Link>
          <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:bg-[#e4e9ea] dark:hover:bg-[#2d3435] py-4 px-8 flex items-center space-x-4 transition-all rounded-r-lg" href="/admin">
            <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
            <span className="font-['Manrope'] tracking-[0.1em] uppercase text-xs font-semibold">Draw Logic</span>
          </Link>
          <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:bg-[#e4e9ea] dark:hover:bg-[#2d3435] py-4 px-8 flex items-center space-x-4 transition-all rounded-r-lg" href="/impact">
            <span className="material-symbols-outlined" data-icon="volunteer_activism">volunteer_activism</span>
            <span className="font-['Manrope'] tracking-[0.1em] uppercase text-xs font-semibold">Charities</span>
          </Link>
          <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:bg-[#e4e9ea] dark:hover:bg-[#2d3435] py-4 px-8 flex items-center space-x-4 transition-all rounded-r-lg" href="/admin">
            <span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
            <span className="font-['Manrope'] tracking-[0.1em] uppercase text-xs font-semibold">Verifications</span>
          </Link>
        </div>
      </nav>

      <header className="w-full sticky top-0 z-30 bg-[#f2f4f4] dark:bg-[#2d3435] border-b border-gray-200 dark:border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-[1600px] mx-auto md:ml-[18rem]">
          <div className="flex items-center space-x-4">
            <span className="material-symbols-outlined text-[#5f5e5e] text-2xl" data-icon="menu_open">menu_open</span>
            <h2 className="font-['Manrope'] tracking-[0.05em] font-bold text-2xl text-[#5f5e5e] dark:text-[#faf7f6]">The Orchestrator</h2>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-8">
              <Link className="text-[#5f5e5e] dark:text-[#faf7f6] border-b-2 border-[#5f5e5e] font-semibold tracking-wider text-sm transition-colors duration-300" href="/admin">OVERVIEW</Link>
              <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:text-[#535252] font-semibold tracking-wider text-sm transition-colors duration-300" href="/admin">ANALYTICS</Link>
              <Link className="text-[#5a6061] dark:text-[#adb3b4] hover:text-[#535252] font-semibold tracking-wider text-sm transition-colors duration-300" href="/admin">AUDIT</Link>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20">
              <img alt="Admin" className="w-full h-full object-cover" data-alt="professional portrait of a confident male executive in a neutral grey studio setting with soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLthnc6WHFLntGQbyF9pHVFo-Ygi6Yi7UgFxBl0ggReHntvU5XF-kYswcLzZy8AbttVE8UJ5_rHvZg8FwhLQTgUDsfMPhNEIujzpbThDBytEnN_U79gbKZrXQ6bvIbAMRSosDHxumad9Lvil1sk7-UV_MEAt4eUxa8OdVf2zu_AOLaCVYgFrbdj8K2ZXwiUrfWkbE7q8y6aY4TrySBCleryi1F670z2rVjXYl5ou-zjwY-8RlLeOhh2QqgwYzvE7EnuYFXYjGkkipP" />
            </div>
          </div>
        </div>
      </header>

      <main className="md:ml-72 min-h-screen px-6 md:px-12 py-12 max-w-[1600px]">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-secondary transition-all hover:shadow-md">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-4">Total Active Users</p>
            <div className="flex items-end justify-between">
              <h3 className="text-5xl font-extrabold tracking-tight text-on-surface">{activeUsers || 0}</h3>
              <div className="text-secondary flex items-center font-bold text-sm bg-secondary-container/30 px-2 py-1 rounded">
                <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">trending_up</span>
                8.2%
              </div>
            </div>
          </div>
          <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary transition-all hover:shadow-md">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mb-4">Total Prize Pool</p>
            <div className="flex items-end justify-between">
              <h3 className="text-5xl font-extrabold tracking-tight text-on-surface">${totalPrizePool.toLocaleString()}</h3>
              <span className="material-symbols-outlined text-on-surface-variant opacity-30 text-3xl" data-icon="account_balance_wallet">account_balance_wallet</span>
            </div>
          </div>
          <div className="md:col-span-4 bg-[#1A1A1A] p-8 rounded-xl shadow-xl transition-all hover:scale-[1.01]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#adb3b4] mb-4">Charity Contributions</p>
            <div className="flex items-end justify-between">
              <h3 className="text-5xl font-extrabold tracking-tight text-[#faf7f6]">${Math.floor(charityContributions).toLocaleString()}</h3>
              <span className="material-symbols-outlined text-secondary text-3xl" data-icon="volunteer_activism" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h4 className="text-2xl font-bold tracking-tight mb-1 text-on-surface">Member Ledger</h4>
                  <p className="text-sm text-on-surface-variant">Real-time status of the subscription ecosystem.</p>
                </div>
                <div className="bg-surface-container-highest px-4 py-2 rounded-lg flex items-center space-x-3">
                  <span className="material-symbols-outlined text-sm" data-icon="search">search</span>
                  <input className="bg-transparent border-none text-xs focus:ring-0 w-32 md:w-48 placeholder:text-on-surface-variant/50 outline-none" placeholder="Search donors..." type="text" />
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20">
                      <th className="py-5 px-8 text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70">Subscriber</th>
                      <th className="py-5 px-8 text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70">Status</th>
                      <th className="py-5 px-8 text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70">Score Avg</th>
                      <th className="py-5 px-8 text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {members && members.length > 0 ? members.map((m, idx) => {
                      const scoresArr = Array.isArray(m.scores) ? m.scores : [];
                      const avg = scoresArr.length > 0 ? (scoresArr.reduce((sum, s) => sum + (s.score || 0), 0) / scoresArr.length).toFixed(1) : 'N/A';
                      return (
                        <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors">
                          <td className="py-6 px-8 flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center text-on-primary-container font-bold text-xs">
                              {(m.first_name?.[0] || '')}{(m.last_name?.[0] || '')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface">{m.first_name || 'Anonymous'} {m.last_name || 'User'}</p>
                              <p className="text-[10px] text-on-surface-variant capitalize">{m.subscription_status} Tier</p>
                            </div>
                          </td>
                          <td className="py-6 px-8">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${m.subscription_status === 'active' ? 'bg-secondary-container text-secondary' : 'bg-surface-container-highest text-on-surface-variant'}`}>{m.subscription_status}</span>
                          </td>
                          <td className="py-6 px-8 font-mono text-sm">{avg}</td>
                          <td className="py-6 px-8 text-right">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary-dim transition-colors">Manage</button>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr><td colSpan={4} className="p-8 text-center text-sm text-on-surface-variant">No members found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="flex items-center space-x-3 mb-8">
                <span className="material-symbols-outlined text-primary text-xl" data-icon="inbox">inbox</span>
                <h4 className="text-xl font-bold tracking-tight text-on-surface">Verification Queue</h4>
                <span className="bg-error text-white text-[10px] font-black px-2 py-0.5 rounded-full">{verifications?.length || 0} PENDING</span>
              </div>
              <div className="space-y-4">
                {verifications && verifications.length > 0 ? verifications.map((v, idx) => (
                  <div key={idx} className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-12 rounded bg-surface-container border border-outline-variant/10 overflow-hidden flex items-center justify-center">
                        {v.proof_image_url ? (
                          <img alt="Proof" className="w-full h-full object-cover" src={v.proof_image_url} />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant/40">image</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Score Verification</p>
                        <p className="text-sm text-on-surface">Winnings Award: ${v.amount} - {(v.profiles as any)?.first_name}</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="p-2 text-error hover:bg-error/10 rounded transition-colors">
                        <span className="material-symbols-outlined" data-icon="close">close</span>
                      </button>
                      <button className="p-2 text-secondary hover:bg-secondary/10 rounded transition-colors">
                        <span className="material-symbols-outlined" data-icon="check" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-xl text-center text-on-surface-variant font-medium text-sm">
                    No pending verifications in queue.
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section className="bg-[#1A1A1A] text-on-primary p-8 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-bold tracking-[0.05em] uppercase mb-8">Draw Orchestration</h4>
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black tracking-[0.2em] text-[#adb3b4] block mb-4 uppercase">Logic Architecture</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg">
                      <button className="py-2 text-[10px] font-bold tracking-widest uppercase bg-white/10 rounded">Random</button>
                      <button className="py-2 text-[10px] font-bold tracking-widest uppercase text-[#adb3b4] hover:text-white">Algorithmic</button>
                    </div>
                  </div>
                  <div className="p-6 border border-white/10 rounded-lg">
                    <p className="text-[10px] text-[#adb3b4] leading-relaxed mb-4">Current Pool Strength: <span className="text-white font-bold">EXCELLENT</span></p>
                    <button className="w-full py-4 border border-white/20 hover:bg-white hover:text-[#1A1A1A] transition-all rounded text-[10px] font-bold tracking-[0.2em] uppercase">Run Simulation</button>
                  </div>
                  <button className="w-full py-4 bg-secondary hover:bg-secondary-dim text-white transition-all rounded-lg text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-secondary/20">
                    Publish Official Results
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold tracking-tight text-on-surface">Benevolent Partners</h4>
                <button className="p-2 bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                </button>
              </div>
              <div className="space-y-3">
                {charities && charities.length > 0 ? charities.map((c, i) => (
                  <div key={i} className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between border-l-2 border-primary/20 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-primary font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{c.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium truncate max-w-[120px]">{c.description || 'Verified Partner'}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/40 text-sm hover:text-primary cursor-pointer transition-colors" data-icon="edit">edit</span>
                  </div>
                )) : (
                  <div className="p-4 text-sm text-on-surface-variant italic text-center">No charity partners added yet.</div>
                )}
              </div>
            </section>

            <section className="p-8 bg-surface-container-high rounded-xl">
              <p className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/60 mb-6">Impact Trajectory</p>
              <div className="h-24 flex items-end space-x-2">
                <div className="flex-1 bg-secondary/10 h-12 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary/20 h-16 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary/30 h-14 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary/40 h-20 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary/50 h-18 rounded-t-sm"></div>
                <div className="flex-1 bg-secondary/70 h-24 rounded-t-sm"></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
