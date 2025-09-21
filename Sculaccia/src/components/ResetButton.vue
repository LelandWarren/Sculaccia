<template>
  <button 
    class="ghost" 
    :aria-label="ARIA_LABELS.resetButton"
    :title="ARIA_LABELS.resetButton"
    @click="handleReset"
  >
    {{ UI_TEXT.resetButton }}
  </button>
</template>

<script lang="ts">
import { useCounts } from '../composables/useCounts'
import { ARIA_LABELS, UI_TEXT } from '../constants'

export default {
  name: 'ResetButton',
  emits: ['reset'],
  
  setup(_, { emit }) {
    const { resetToday } = useCounts()

    return {
      resetToday,
      emit,
      ARIA_LABELS,
      UI_TEXT
    }
  },

  methods: {
    handleReset(): void {
      // Reset today's counter
      this.resetToday()
      
      // Emit reset event for parent component
      this.emit('reset')
    }
  }
}
</script>

<style scoped>
/* Button styles are in global styles.css */
</style>
