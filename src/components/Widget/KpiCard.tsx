import type { ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined'
import TrendingDownOutlined from '@mui/icons-material/TrendingDownOutlined'
import TrendingFlatOutlined from '@mui/icons-material/TrendingFlatOutlined'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { KpiCardProps } from './types'

export default function KpiCard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  trend = 'neutral',
  loading = false,
  sparklineData,
  sparklineColor,
  icon,
  className = '',
}: KpiCardProps): ReactNode {
  const theme = useTheme()

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  }

  const TrendIcon = {
    up: TrendingUpOutlined,
    down: TrendingDownOutlined,
    neutral: TrendingFlatOutlined,
  }[trend]

  const chartColor = sparklineColor ?? theme.palette.primary.main

  const sparklineOptions: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
      animations: { enabled: true, speed: 500 },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: [chartColor],
    tooltip: {
      enabled: false,
    },
  }

  if (loading) {
    return (
      <Paper
        elevation={0}
        className={`border border-gray-200 dark:border-gray-700 p-4 ${className}`}
      >
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2, borderRadius: 1 }} />
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      className={`border border-gray-200 dark:border-gray-700 p-4 h-full flex flex-col ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <div className="flex items-baseline gap-2">
            <Typography variant="h4" fontWeight={700}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            {change !== undefined && (
              <div
                className="flex items-center gap-0.5"
                style={{ color: trendColors[trend] }}
              >
                <TrendIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" fontWeight={600}>
                  {change > 0 ? '+' : ''}{change}%
                </Typography>
              </div>
            )}
          </div>
          {(subtitle ?? changeLabel) && (
            <Typography variant="caption" color="text.secondary">
              {changeLabel ?? subtitle}
            </Typography>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
            {icon}
          </div>
        )}
      </div>

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-auto pt-3">
          <ReactApexChart
            options={sparklineOptions}
            series={[{ data: sparklineData }]}
            type="line"
            height={40}
          />
        </div>
      )}
    </Paper>
  )
}

