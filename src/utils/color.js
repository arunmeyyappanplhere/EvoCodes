// serviceColor is stored as a hex string (e.g. "#22d3ee") in MongoDB.
// Shared by Services.jsx, ServicesOnHome.jsx, and ServiceModal.jsx so the
// icon/title/badge theming logic lives in exactly one place.

export const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return `rgba(34, 211, 238, ${alpha})` // cyan-400 fallback
  }
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Style object for a bordered/filled "chip" (icon box, badge pill) themed
// off a single hex color.
export const chipStyle = (hex) => ({
  backgroundColor: hexToRgba(hex, 0.1),
  borderColor: hexToRgba(hex, 0.3),
  color: hex || '#22d3ee',
})

// Style object for plain themed text (titles, labels).
export const textStyle = (hex) => ({
  color: hex || '#22d3ee',
})
