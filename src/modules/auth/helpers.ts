// ==============================|| AUTH HELPERS ||============================== //

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password requirements
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters')
  }
  if (password.length > 50) {
    errors.push('Password must be less than 50 characters')
  }
  if (password !== password.trim()) {
    errors.push('Password cannot start or end with spaces')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Password strength indicator
 */
interface StrengthLevel {
  score: number
  label: string
  color: string
}

export function getPasswordStrength(password: string): StrengthLevel {
  let score = 0

  if (!password) {
    return { score: 0, label: 'Poor', color: '#f44336' }
  }

  if (password.length >= 6) score += 1
  if (password.length >= 10) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  const normalizedScore = Math.min(4, Math.floor(score * 0.7))

  const levels: StrengthLevel[] = [
    { score: 0, label: 'Poor', color: '#f44336' },
    { score: 1, label: 'Weak', color: '#ff9800' },
    { score: 2, label: 'Normal', color: '#ffeb3b' },
    { score: 3, label: 'Good', color: '#4caf50' },
    { score: 4, label: 'Strong', color: '#2196f3' },
  ]

  return levels[normalizedScore]
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

