<template>
  <button 
    class="btn" 
    :aria-label="ARIA_LABELS.mainButton"
    :title="ARIA_LABELS.mainButton"
    @click="handleSlap"
    @touchstart="handleTouchSlap"
    @keydown="handleKeydown"
  >
    {{ UI_TEXT.mainButton }}
    <small>{{ UI_TEXT.mainButtonSubtext }}</small>
  </button>
</template>

<script lang="ts">
import { useCounts } from '../composables/useCounts'
import { useAudio } from '../composables/useAudio'
import { useHaptics } from '../composables/useHaptics'
import { ARIA_LABELS, UI_TEXT } from '../constants'

export default {
  name: 'SculacciaButton',
  emits: ['slap'],
  
  setup(_, { emit }) {
    const { incrementCounts } = useCounts()
    const { pop } = useAudio()
    const { slapVibrate } = useHaptics()

    return {
      incrementCounts,
      pop,
      slapVibrate,
      emit,
      ARIA_LABELS,
      UI_TEXT
    }
  },

  methods: {
    // Get tap/click coordinates for emoji burst
    getTapCoordinates(event: MouseEvent | TouchEvent): { x: number; y: number } {
      if ('touches' in event && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY }
      }
      if ('clientX' in event) {
        return { x: event.clientX, y: event.clientY }
      }
      // Fallback to center of screen
      return { 
        x: window.innerWidth * 0.5, 
        y: window.innerHeight * 0.45 
      }
    },

    // Main slap action
    handleSlap(event: MouseEvent): void {
      this.performSlap(event)
    },

    // Touch slap (passive event)
    handleTouchSlap(event: TouchEvent): void {
      this.performSlap(event)
    },

    // Keyboard accessibility
    handleKeydown(event: KeyboardEvent): void {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        this.performSlap()
      }
    },

    // Core slap logic
    performSlap(event?: MouseEvent | TouchEvent): void {
      // Update counters
      this.incrementCounts()
      
      // Audio feedback
      this.pop()
      
      // Haptic feedback
      this.slapVibrate()
      
      // Get coordinates for emoji burst
      const coordinates = event ? this.getTapCoordinates(event) : { 
        x: window.innerWidth * 0.5, 
        y: window.innerHeight * 0.45 
      }
      
      // Emit slap event with coordinates for parent components
      this.emit('slap', coordinates)
    }
  }
}
</script>

<style scoped>
/* Button styles are in global styles.css */
</style>
