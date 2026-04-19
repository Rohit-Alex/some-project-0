import type { ReactNode } from 'react'

interface TablePageLayoutProps {
  /** Page title */
  title: string
  /** Toolbar or filter components */
  toolbar?: ReactNode
  /** Main table or content */
  children: ReactNode
  /** Additional header actions */
  headerActions?: ReactNode
}

/**
 * Layout component for table-based pages that ensures proper scrolling behavior.
 * The table content will scroll within the allocated space, not the entire page.
 */
export default function TablePageLayout({
  title,
  toolbar,
  children,
  headerActions,
}: TablePageLayoutProps): ReactNode {
  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="flex-none mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      </div>

      {/* Toolbar - Fixed */}
      {toolbar && (
        <div className="flex-none mb-4">
          {toolbar}
        </div>
      )}

      {/* Content Container - Flexible, Scrollable */}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}