import { lazy, Suspense } from 'react'
import PageLoader from '@components/PageLoader'

const PlaceholderPage = lazy(() => import('./PlaceholderPage'))

interface LazyPageProps {
  title: string
}

export default function LazyPage({ title }: LazyPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <PlaceholderPage title={title} />
    </Suspense>
  )
}

