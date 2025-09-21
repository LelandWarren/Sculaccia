<template>
  <canvas 
    ref="canvasRef"
    class="burst" 
    :width="canvasWidth" 
    :height="canvasHeight"
  ></canvas>
</template>

<script lang="ts">
import { BURST_EMOJIS } from '../constants'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  emoji: string
  size: number
  spin: number
}

export default {
  name: 'EmojiBurstCanvas',
  
  data() {
    return {
      canvasWidth: 1,
      canvasHeight: 1,
      particles: [] as Particle[],
      animationId: null as number | null,
      ctx: null as CanvasRenderingContext2D | null
    }
  },

  mounted() {
    this.initCanvas()
    this.resizeCanvas()
    window.addEventListener('resize', this.resizeCanvas)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas)
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  },

  methods: {
    initCanvas(): void {
      const canvas = this.$refs.canvasRef as HTMLCanvasElement
      this.ctx = canvas.getContext('2d')
    },

    resizeCanvas(): void {
      this.canvasWidth = window.innerWidth
      this.canvasHeight = window.innerHeight
    },

    // Create emoji burst at specific coordinates
    spawnBurst(x: number, y: number): void {
      const particleCount = 22 // Same as HTML version
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() * 2 - 1) * (8 + Math.random() * 6),
          vy: -(6 + Math.random() * 6),
          life: 0,
          ttl: 60 + Math.random() * 20,
          emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
          size: 18 + Math.random() * 14,
          spin: (Math.random() * 2 - 1) * 0.1
        })
      }
      
      if (!this.animationId) {
        this.animate()
      }
    },

    animate(): void {
      if (!this.ctx) return

      this.animationId = requestAnimationFrame(this.animate)
      
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // Update and draw particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i]
        
        // Update particle
        p.life++
        p.vy += 0.25 // gravity
        p.x += p.vx
        p.y += p.vy
        p.size *= 0.995 // shrink over time
        
        // Calculate alpha for fade out
        const alpha = Math.max(0, 1 - p.life / p.ttl)
        
        // Draw particle
        this.ctx.save()
        this.ctx.globalAlpha = alpha
        this.ctx.translate(p.x, p.y)
        this.ctx.rotate(p.spin * p.life)
        this.ctx.font = `${p.size}px system-ui, apple color emoji, segoe ui emoji`
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(p.emoji, 0, 0)
        this.ctx.restore()
        
        // Remove dead particles
        if (p.life > p.ttl) {
          this.particles.splice(i, 1)
        }
      }
      
      // Stop animation when no particles
      if (this.particles.length === 0) {
        cancelAnimationFrame(this.animationId!)
        this.animationId = null
      }
    }
  }
}
</script>

<style scoped>
/* Canvas styles are in global styles.css */
</style>
