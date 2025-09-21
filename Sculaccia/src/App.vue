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
      UI_TEXT,
      phraseProgress: 100,
      phraseTimer: null as number | null
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
      // Clear any existing timer
      if (this.phraseTimer) {
        clearInterval(this.phraseTimer)
      }

      this.currentPhrase = phrase
      this.showPhrase = true
      this.phraseProgress = 100

      // Animate progress decay over 5 seconds
      const duration = 5000 // 5 seconds
      const interval = 50 // Update every 50ms for smooth animation
      const decrement = (100 / duration) * interval

      this.phraseTimer = setInterval(() => {
        this.phraseProgress -= decrement
        
        if (this.phraseProgress <= 0) {
          this.phraseProgress = 0
          this.showPhrase = false
          this.currentPhrase = ''
          if (this.phraseTimer) {
            clearInterval(this.phraseTimer)
            this.phraseTimer = null
          }
        }
      }, interval)
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
  },

  beforeUnmount() {
    // Clean up timer when component is destroyed
    if (this.phraseTimer) {
      clearInterval(this.phraseTimer)
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

      <!-- Nice Phrase Display with Timer -->
      <div 
        v-if="showPhrase" 
        role="status"
        class="phrase-container"
      >
        <div class="phrase-timer">
          <svg class="progress-ring" width="24" height="24" viewBox="0 0 24 24">
            <circle
              class="progress-ring-background"
              cx="12"
              cy="12"
              r="10"
              fill="transparent"
              stroke="#e5e7eb"
              stroke-width="2"
            />
            <circle
              class="progress-ring-progress"
              cx="12"
              cy="12"
              r="10"
              fill="transparent"
              stroke="#ff6b6b"
              stroke-width="2"
              :stroke-dasharray="62.83"
              :stroke-dashoffset="62.83 - (62.83 * phraseProgress / 100)"
              transform="rotate(-90 12 12)"
            />
          </svg>
        </div>
        <div class="phrase-text">
          {{ currentPhrase }}
        </div>
      </div>

      <!-- Footer -->
      <p class="footer">{{ UI_TEXT.footer }}</p>
    </main>

    <!-- Emoji Burst Canvas -->
    <EmojiBurstCanvas ref="emojiBurst" />
  </div>
</template>

<style scoped>
.phrase-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  padding: 8px 16px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

.phrase-timer {
  flex-shrink: 0;
}

.progress-ring {
  transform: rotate(0deg);
  transition: none;
}

.progress-ring-progress {
  transition: stroke-dashoffset 50ms linear;
}

.phrase-text {
  font-weight: 800;
  color: var(--ink);
  text-align: center;
  line-height: 1.3;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .phrase-container {
    gap: 8px;
    padding: 6px 12px;
    margin: 10px 8px 0;
  }
  
  .progress-ring {
    width: 20px;
    height: 20px;
  }
  
  .phrase-text {
    font-size: 14px;
  }
}
</style>
