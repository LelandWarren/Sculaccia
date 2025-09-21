<script lang="ts">
import SculacciaButton from './components/SculacciaButton.vue'
import CounterChips from './components/CounterChips.vue'
import NicePhrase from './components/NicePhrase.vue'
import ResetButton from './components/ResetButton.vue'
import EmojiBurstCanvas from './components/EmojiBurstCanvas.vue'
import { UI_TEXT } from './constants'

export default {
  name: 'App',
  
  components: {
    SculacciaButton,
    CounterChips,
    NicePhrase,
    ResetButton,
    EmojiBurstCanvas
  },

  data() {
    return {
      currentPhrase: '',
      showPhrase: false,
      heroEmoji: UI_TEXT.heroEmoji,
      UI_TEXT
    }
  },

  methods: {
    // Handle slap action from SculacciaButton
    handleSlap(coordinates: { x: number; y: number }): void {
      // Trigger emoji burst at tap location
      const canvas = this.$refs.emojiBurst as InstanceType<typeof EmojiBurstCanvas>
      canvas.spawnBurst(coordinates.x, coordinates.y)
      
      // Hero animation
      this.animateHero()
    },

    // Handle phrase display from NicePhrase button
    handlePhraseShown(phrase: string): void {
      this.currentPhrase = phrase
      this.showPhrase = true
      
      // Hide phrase after 2.4 seconds (same as HTML)
      setTimeout(() => {
        this.showPhrase = false
        this.currentPhrase = ''
      }, 2400)
    },

    // Handle reset action
    handleReset(): void {
      // Could add visual feedback here if needed
      console.log('Today\'s counter reset')
    },

    // Animate hero emoji on slap
    animateHero(): void {
      const heroElement = this.$refs.hero as HTMLElement
      if (heroElement && heroElement.animate) {
        heroElement.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.06)' },
          { transform: 'scale(1)' }
        ], { 
          duration: 160, 
          easing: 'cubic-bezier(.2,.8,.2,1)' 
        })
      }
    }
  }
}
</script>

<template>
  <div class="wrap">
    <main class="card" role="main" aria-live="polite">
      <!-- Hero Section -->
      <div class="top" aria-hidden="true">
        <div ref="hero" class="hero">{{ heroEmoji }}</div>
      </div>
      
      <!-- Title and Subtitle -->
      <h1 class="title" style="text-align: center">{{ UI_TEXT.title }}</h1>
      <p class="subtitle" v-html="UI_TEXT.subtitle"></p>

      <!-- Counter Display -->
      <CounterChips />

      <!-- Main Slap Button -->
      <SculacciaButton @slap="handleSlap" />

      <!-- Secondary Actions Row -->
      <div class="row">
        <NicePhrase @phrase-shown="handlePhraseShown" />
        <ResetButton @reset="handleReset" />
      </div>

      <!-- Nice Phrase Display -->
      <div 
        v-if="showPhrase" 
        role="status"
        style="text-align: center; margin-top: 10px; font-weight: 800;"
      >
        {{ currentPhrase }}
      </div>

      <!-- Footer -->
      <p class="footer">{{ UI_TEXT.footer }}</p>
    </main>

    <!-- Emoji Burst Canvas -->
    <EmojiBurstCanvas ref="emojiBurst" />
  </div>
</template>

<style scoped>
/* All styles are in global styles.css */
</style>
