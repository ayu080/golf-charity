import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Stableford max range is 1 to 45
const generateRandomDraw = () => {
  const nums = new Set<number>()
  while(nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1)
  }
  return Array.from(nums)
}

const generateAlgorithmicDraw = (allScores: number[]) => {
  // Simple weighted method: favor least/most frequent based on a random seed factor
  // For demo purposes, we will slightly weight towards numbers that actually appeared
  if(allScores.length < 5) return generateRandomDraw()
  
  const freqMap = allScores.reduce((acc: Record<number, number>, score) => {
    acc[score] = (acc[score] || 0) + 1
    return acc
  }, {})
  
  // Sort by frequency
  const sortedByFreq = Object.entries(freqMap).sort((a, b) => (b[1] as number) - (a[1] as number))
  
  const nums = new Set<number>()
  // Pick top 2 frequent
  nums.add(Number(sortedByFreq[0][0]))
  if (sortedByFreq.length > 1) nums.add(Number(sortedByFreq[1][0]))
  
  // Fill rest randomly
  while(nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1)
  }
  return Array.from(nums)
}

export async function POST(req: Request) {
  try {
    const { logic = 'random', action = 'simulate' } = await req.json()
    const supabase = await createClient()
    
    // Auth & Role check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

    // Step 1: Fetch active users and their latest scores
    const { data: activeUsers } = await supabase
      .from('profiles')
      .select('id, subscription_status')
      .eq('subscription_status', 'active')

    if (!activeUsers) throw new Error('Could not fetch active users')

    const userIds = activeUsers.map(u => u.id)
    
    // Fetch scores
    const { data: scoresData } = await supabase
      .from('scores')
      .select('user_id, score')
      .in('user_id', userIds)

    const userScores: Record<string, number[]> = {}
    const allScoresArray: number[] = []

    scoresData?.forEach(row => {
      if (!userScores[row.user_id]) userScores[row.user_id] = []
      userScores[row.user_id].push(row.score)
      allScoresArray.push(row.score)
    })

    // Step 2: Generate Winning Numbers
    const winningNumbers = logic === 'algorithmic' 
      ? generateAlgorithmicDraw(allScoresArray) 
      : generateRandomDraw()

    // Step 3: Match users
    const winners = {
      match5: [] as string[],
      match4: [] as string[],
      match3: [] as string[]
    }

    Object.entries(userScores).forEach(([uid, uScores]) => {
      // Check intersections
      let matches = 0
      uScores.forEach(score => {
        if (winningNumbers.includes(score)) matches++
      })

      if (matches === 5) winners.match5.push(uid)
      else if (matches === 4) winners.match4.push(uid)
      else if (matches === 3) winners.match3.push(uid)
    })

    // Step 4: Prize Pool Logic
    // E.g. pool = userIds.length * $5 (just a mock metric, normally a % of revenue tracked collectively)
    const MOCK_TOTAL_PRIZE_POOL = userIds.length * 5 || 1000 // if 0 users, mock 1000 for demo
    let jackpotRolledOver = false

    const prizeAllocation = {
      match5: winners.match5.length > 0 ? (MOCK_TOTAL_PRIZE_POOL * 0.40) : 0,
      match4: winners.match4.length > 0 ? (MOCK_TOTAL_PRIZE_POOL * 0.35) : 0,
      match3: winners.match3.length > 0 ? (MOCK_TOTAL_PRIZE_POOL * 0.25) : 0,
    }

    if (winners.match5.length === 0) {
      jackpotRolledOver = true
    }

    // Step 5: Save if publish
    if (action === 'publish') {
       const { data: drawRecord, error: drawError } = await supabase
         .from('draws')
         .insert({
           month: new Date().toISOString().slice(0, 7), // "YYYY-MM"
           winning_numbers: winningNumbers,
           status: 'published',
           jackpot_rolled_over: jackpotRolledOver
         })
         .select()
         .single()

       if (drawError || !drawRecord) throw new Error('Draw save failed')

       // Insert winnings
       const insertWinnings = async (uids: string[], matchType: number, poolAmount: number) => {
         if (uids.length === 0) return
         const amountPerPerson = poolAmount / uids.length
         const rows = uids.map(uid => ({
           user_id: uid,
           draw_id: drawRecord.id,
           amount: amountPerPerson,
           match_type: matchType,
           status: 'pending'
         }))
         await supabase.from('winnings').insert(rows)
       }

       await insertWinnings(winners.match5, 5, prizeAllocation.match5)
       await insertWinnings(winners.match4, 4, prizeAllocation.match4)
       await insertWinnings(winners.match3, 3, prizeAllocation.match3)
    }

    return NextResponse.json({
      success: true,
      action,
      winningNumbers,
      pool: MOCK_TOTAL_PRIZE_POOL,
      jackpotRolledOver,
      allocation: prizeAllocation,
      winnersCount: {
        match5: winners.match5.length,
        match4: winners.match4.length,
        match3: winners.match3.length
      }
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Draw api error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
