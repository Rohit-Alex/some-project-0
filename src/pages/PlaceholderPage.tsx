import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ConstructionOutlined from '@mui/icons-material/ConstructionOutlined'

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <Paper className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <ConstructionOutlined sx={{ fontSize: 64, color: 'text.secondary' }} />
      <Typography variant="h4" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This page is under construction
      </Typography>
    </Paper>
  )
}

