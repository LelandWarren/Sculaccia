<template>
  <div class="counter">
    <span 
      class="chip" 
      :aria-label="ARIA_LABELS.totalCount"
    >
      {{ formatCountText(counts.total) }}
    </span>
    <span 
      class="chip" 
      :aria-label="ARIA_LABELS.todayCount"
    >
      {{ formatTodayText(counts.today) }}
    </span>
  </div>
</template>

<script lang="ts">
import { useCounts } from '../composables/useCounts'
import { ARIA_LABELS } from '../constants'

export default {
  name: 'CounterChips',
  
  setup() {
    const { counts, formatCountText, formatTodayText, initializeCounts } = useCounts()
    
    // Initialize counts on component mount
    initializeCounts()

    return {
      counts,
      formatCountText,
      formatTodayText,
      ARIA_LABELS
    }
  }
}
</script>

<style scoped>
/* Counter styles are in global styles.css */
</style>
