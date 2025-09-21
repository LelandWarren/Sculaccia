// Storage keys for localStorage
export const LS_KEY = 'sculaccia.count.total.v1'
export const LS_TODAY = 'sculaccia.count.today.v1'
export const LS_DATE = 'sculaccia.date.v1'

// Generate today's date key for localStorage
export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Italian phrases for the "nice things" button
export const phrases = [
  'Solo per ridere, mamma! 😇',
  'Con amore e rispetto 💖',
  'Scherzetto! Niente paura 🤗',
  'Educativo… più o meno 😅',
  'Obbediente come sempre! 😌',
  'Una sculacciata gentile 🙃',
  'Prometto che studio di più 📚',
  'Mamma regina del mondo 👑',
  'Ho già rifatto il letto! 🛏️',
  'Ok, niente telefono a tavola 📵'
]

// Emojis for the confetti burst
export const BURST_EMOJIS = ['🇮🇹', '🍕', '🍑', '✨', '💥', '🎉', '💖', '😄', '🥳', '👏', '🌟', '💫']

// UI Text constants
export const UI_TEXT = {
  title: 'Sculaccia!',
  subtitle: 'Premi il bottone per dare una <strong>sculacciata</strong>. È solo per ridere (mamma-friendly) 😇',
  mainButton: 'Dai una sculacciata',
  mainButtonSubtext: '(vibra + emoji + suono)',
  niceButton: 'Dimmi qualcosa di carino',
  resetButton: 'Resetta oggi',
  footer: 'Suggerimenti: aggiungi questo link ai preferiti sul tuo telefono o da qualche altra parte perché non posso trasformarlo in un app vera e propria',
  heroEmoji: '✋🍑',
  countSingle: 'sculacciata',
  countPlural: 'sculacciate',
  todayPrefix: 'oggi: '
} as const

// ARIA labels for accessibility
export const ARIA_LABELS = {
  mainButton: 'Dai una sculacciata',
  niceButton: 'Frase carina',
  resetButton: 'Azzera solo il conteggio di oggi',
  totalCount: 'Conteggio totale',
  todayCount: 'Oggi'
} as const
