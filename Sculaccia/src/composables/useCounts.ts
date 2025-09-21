import { reactive } from 'vue'
import { LS_KEY, LS_TODAY, LS_DATE, todayKey } from '../constants'

interface Counts {
  total: number
  today: number
}

// Reactive state for counts
const counts = reactive<Counts>({
  total: 0,
  today: 0
})

export function useCounts() {
  // Get counts from localStorage with date rollover logic
  function getCounts(): Counts {
    const storedDate = localStorage.getItem(LS_DATE)
    const tKey = todayKey()
    
    // Reset today's count if date has changed
    if (storedDate !== tKey) {
      localStorage.setItem(LS_DATE, tKey)
      localStorage.setItem(LS_TODAY, '0')
    }
    
    return {
      total: Number(localStorage.getItem(LS_KEY) || '0'),
      today: Number(localStorage.getItem(LS_TODAY) || '0')
    }
  }

  // Save counts to localStorage and update reactive state
  function setCounts(newCounts: Counts): void {
    localStorage.setItem(LS_KEY, String(newCounts.total))
    localStorage.setItem(LS_TODAY, String(newCounts.today))
    
    // Update reactive state
    counts.total = newCounts.total
    counts.today = newCounts.today
  }

  // Increment both counters (for slap action)
  function incrementCounts(): void {
    const current = getCounts()
    setCounts({
      total: current.total + 1,
      today: current.today + 1
    })
  }

  // Reset only today's counter
  function resetToday(): void {
    const current = getCounts()
    setCounts({
      total: current.total,
      today: 0
    })
  }

  // Initialize counts from localStorage
  function initializeCounts(): void {
    const storedCounts = getCounts()
    counts.total = storedCounts.total
    counts.today = storedCounts.today
  }

  // Format count text for display
  function formatCountText(count: number): string {
    return `${count} ${count === 1 ? 'sculacciata' : 'sculacciate'}`
  }

  function formatTodayText(count: number): string {
    return `oggi: ${count}`
  }

  return {
    counts: counts, // Reactive counts
    getCounts,
    setCounts,
    incrementCounts,
    resetToday,
    initializeCounts,
    formatCountText,
    formatTodayText
  }
}
