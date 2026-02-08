import { useRef, useState, useEffect, Suspense, lazy } from 'react'
import type { ReactNode, ComponentType } from 'react'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

interface LazyWidgetProps {
  /** Minimum height for the widget placeholder */
  minHeight?: number
  /** Component to render when visible */
  children: ReactNode
  /** Optional className */
  className?: string
  /** Root margin for intersection observer (when to start loading) */
  rootMargin?: string
}

/**
 * LazyWidget - Only renders children when the widget is visible in viewport
 * This helps reduce initial load time by deferring rendering of off-screen widgets
 */
export default function LazyWidget({
  minHeight = 300,
  children,
  className = '',
  rootMargin = '100px',
}: LazyWidgetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [rootMargin])

  if (!isVisible) {
    return (
      <Paper
        ref={ref}
        elevation={0}
        className={`border border-gray-200 dark:border-gray-700 ${className}`}
        sx={{ minHeight }}
      >
        <div className="p-4">
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={16} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={minHeight - 80} sx={{ borderRadius: 1 }} />
        </div>
      </Paper>
    )
  }

  return <>{children}</>
}

/**
 * Creates a lazy-loaded widget component that only loads and renders when visible
 */
export function createLazyWidget<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallbackHeight = 300
) {
  const LazyComponent = lazy(importFn)

  return function LazyWidgetWrapper(props: P) {
    return (
      <LazyWidget minHeight={fallbackHeight}>
        <Suspense
          fallback={
            <Paper
              elevation={0}
              className="border border-gray-200 dark:border-gray-700"
              sx={{ minHeight: fallbackHeight }}
            >
              <div className="p-4">
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={16} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={fallbackHeight - 80} sx={{ borderRadius: 1 }} />
              </div>
            </Paper>
          }
        >
          <LazyComponent {...props} />
        </Suspense>
      </LazyWidget>
    )
  }
}

