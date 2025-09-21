import { ref } from 'vue'

export function useHaptics() {
  const isHapticsSupported = ref(false)

  // Check if vibration is supported
  function checkHapticsSupport(): void {
    isHapticsSupported.value = 'vibrate' in navigator && typeof navigator.vibrate === 'function'
  }

  // Trigger haptic feedback (short vibration pattern)
  function vibrate(pattern: number | number[] = [10, 30, 10]): void {
    if (!isHapticsSupported.value) {
      return // Gracefully skip if not supported
    }

    try {
      navigator.vibrate(pattern)
    } catch (error) {
      console.warn('Vibration failed:', error)
    }
  }

  // Specific vibration patterns
  function shortVibrate(): void {
    vibrate(50) // Single 50ms vibration
  }

  function doubleVibrate(): void {
    vibrate([50, 50, 50]) // Double vibration pattern
  }

  function slapVibrate(): void {
    vibrate([10, 30, 10]) // Pattern from the original HTML
  }

  // Initialize haptics support check
  checkHapticsSupport()

  return {
    isHapticsSupported,
    vibrate,
    shortVibrate,
    doubleVibrate,
    slapVibrate,
    checkHapticsSupport
  }
}
