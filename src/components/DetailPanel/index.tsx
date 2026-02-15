import type { ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import CloseOutlined from '@mui/icons-material/CloseOutlined'

// ==============================|| DETAIL PANEL TYPES ||============================== //

export interface DetailSection {
  /** Section title */
  title: string
  /** Key-value pairs to display */
  data: Record<string, string | number | boolean | undefined | null>
}

export interface DetailPanelProps {
  /** Whether the panel is open */
  open: boolean
  /** Panel title */
  title: string
  /** Sections to display */
  sections: DetailSection[]
  /** Close handler */
  onClose: () => void
  /** Custom content to render after sections */
  children?: ReactNode
}

// ==============================|| DETAIL SECTION ||============================== //

function DetailSectionComponent({ title, data }: DetailSection) {
  // Format camelCase to readable label
  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  // Check if value should be rendered as a link
  const isLinkField = (key: string): boolean => {
    const linkKeywords = ['link', 'download', 'url', 'preview', 'forensic']
    return linkKeywords.some((kw) => key.toLowerCase().includes(kw))
  }

  // Convert value to string for display
  const formatValue = (value: string | number | boolean | undefined | null): string => {
    if (value === undefined || value === null || value === '') return '-'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{
          mb: 1.5,
          pb: 0.5,
          borderBottom: 1,
          borderColor: 'divider',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Typography>

      <Box
        component="dl"
        sx={{
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
        }}
      >
        {Object.entries(data).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography
              component="dt"
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                flexShrink: 0,
                minWidth: 120,
                maxWidth: 140,
              }}
            >
              {formatLabel(key)}
            </Typography>
            <Typography
              component="dd"
              variant="caption"
              sx={{
                m: 0,
                wordBreak: 'break-word',
                flex: 1,
                minWidth: 0,
              }}
            >
              {isLinkField(key) && formatValue(value) !== '-' ? (
                <Link href="#" underline="hover" sx={{ cursor: 'pointer' }}>
                  {formatValue(value)}
                </Link>
              ) : (
                formatValue(value)
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ==============================|| DETAIL PANEL ||============================== //

export default function DetailPanel({
  open,
  title,
  sections,
  onClose,
  children,
}: DetailPanelProps) {
  return (
    <Collapse in={open}>
      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          <IconButton size="small" onClick={onClose} aria-label="Close details">
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: `repeat(${Math.min(sections.length, 4)}, 1fr)`,
              },
              gap: 3,
            }}
          >
            {sections.map((section, index) => (
              <DetailSectionComponent
                key={section.title || index}
                title={section.title}
                data={section.data}
              />
            ))}
          </Box>

          {/* Custom content */}
          {children && (
            <>
              <Divider sx={{ my: 2 }} />
              {children}
            </>
          )}
        </Box>
      </Paper>
    </Collapse>
  )
}

// Export types and section component
export { DetailSectionComponent as DetailSection }
export type { DetailSection as DetailSectionData }

