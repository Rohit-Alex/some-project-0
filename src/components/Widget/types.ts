import type { ReactNode } from 'react'

export interface WidgetCardProps {
  title: string
  subtitle?: string
  tooltip?: string
  children: ReactNode
  loading?: boolean
  className?: string
  headerAction?: ReactNode
  minHeight?: number | string
}

export interface KpiCardProps {
  title: string
  value: number | string
  subtitle?: string
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  loading?: boolean
  sparklineData?: number[]
  sparklineColor?: string
  icon?: ReactNode
  className?: string
}

export interface TimelineEventProps {
  id: string
  title: string
  subtitle?: string
  timestamp: string
  icon?: ReactNode
  color?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary'
  details?: Record<string, string | number>
}

export interface TimelineWidgetProps {
  events: TimelineEventProps[]
  loading?: boolean
  maxHeight?: number
  className?: string
}

