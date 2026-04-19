/**
 * Chart utilities for optimizing display and readability
 */

/**
 * Optimizes categories for better chart readability by reducing label density
 */
export function optimizeCategoriesForDisplay(categories: string[]): string[] {
  if (!categories || categories.length <= 12) {
    return categories
  }

  // For 24-hour data, show every 3 hours (8 labels total)
  if (categories.length === 24 && categories.every(cat => cat.includes('AM') || cat.includes('PM'))) {
    return categories.filter((_, index) => index % 3 === 0)
  }

  // For other crowded data, show every nth label to keep around 8-10 visible
  const targetLabels = 8
  const step = Math.ceil(categories.length / targetLabels)
  
  return categories.filter((_, index) => index % step === 0)
}

/**
 * Determines if categories should use rotated labels
 */
export function shouldRotateLabels(categories: string[]): boolean {
  if (!categories) return false
  
  // Check if labels are likely to overlap based on content and count
  const avgLabelLength = categories.reduce((sum, cat) => sum + cat.length, 0) / categories.length
  
  return (
    categories.length > 8 ||
    (categories.length > 6 && avgLabelLength > 5) ||
    categories.some(cat => cat.length > 8)
  )
}

/**
 * Gets optimal rotation angle for labels
 */
export function getLabelRotation(categories: string[]): number {
  if (!shouldRotateLabels(categories)) return 0
  
  // For hourly data (AM/PM format), -30 degrees works well
  if (categories.every(cat => cat.includes('AM') || cat.includes('PM'))) {
    return -30
  }
  
  // For other data, use -45 degrees
  return -45
}

/**
 * Gets optimal max height for rotated labels
 */
export function getLabelMaxHeight(categories: string[]): number {
  const rotation = getLabelRotation(categories)
  
  if (rotation === 0) return 40 // No rotation
  if (rotation === -30) return 60 // Slight rotation
  return 80 // Full rotation
}