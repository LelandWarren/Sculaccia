<template>
  <button 
    class="secondary" 
    :aria-label="ARIA_LABELS.niceButton"
    :title="ARIA_LABELS.niceButton"
    @click="sayNice"
  >
    {{ UI_TEXT.niceButton }}
  </button>
</template>

<script lang="ts">
import { phrases, ARIA_LABELS, UI_TEXT } from '../constants'

export default {
  name: 'NicePhrase',
  emits: ['phrase-shown'],
  
  setup(_, { emit }) {
    return {
      emit,
      ARIA_LABELS,
      UI_TEXT
    }
  },

  methods: {
    // Show a random nice phrase
    sayNice(): void {
      // Get random phrase
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      
      // Emit the phrase to parent component for display
      this.emit('phrase-shown', randomPhrase)
    }
  }
}
</script>

<style scoped>
/* Button styles are in global styles.css */
</style>
