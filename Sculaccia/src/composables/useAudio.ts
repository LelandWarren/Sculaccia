import { ref } from 'vue'

// Audio context for generating sounds
let audioCtx: AudioContext | null = null

export function useAudio() {
  const isAudioSupported = ref(false)

  // Initialize audio context
  function initializeAudio(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtx = new AudioContextClass()
        isAudioSupported.value = true
      }
    } catch (error) {
      console.warn('Audio not supported:', error)
      isAudioSupported.value = false
    }
  }

  // Generate a short "pop" sound using WebAudio (no external file needed)
  function pop(): void {
    if (!audioCtx || !isAudioSupported.value) {
      return // Gracefully skip if not supported
    }

    try {
      // Resume context if suspended (required by some browsers)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }

      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      // Configure oscillator for pop sound
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(420, audioCtx.currentTime)
      
      // Configure gain envelope for pop effect
      gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12)
      
      // Connect and play
      oscillator.connect(gainNode).connect(audioCtx.destination)
      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.13)
    } catch (error) {
      console.warn('Failed to play pop sound:', error)
    }
  }

  // Initialize on first use
  if (!audioCtx) {
    initializeAudio()
  }

  return {
    isAudioSupported,
    pop,
    initializeAudio
  }
}
