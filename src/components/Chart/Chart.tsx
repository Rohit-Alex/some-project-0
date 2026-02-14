import { useMemo } from 'react'
import type { ReactNode } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTheme } from '@mui/material/styles'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { ApexOptions } from 'apexcharts'
import type { ChartProps } from './types'
import { useThemeStore } from '@store/useThemeStore'
import { ThemeMode } from '@config/index'

// ==============================|| REUSABLE CHART ||============================== //

// Check if series has data
function hasData(series: ChartProps['series']): boolean {
  if (!series || !Array.isArray(series)) return false
  if (series.length === 0) return false

  // For pie/donut/radialBar charts, series is number[]
  if (typeof series[0] === 'number') {
    return series.some((v) => v !== 0)
  }

  // For bar/line/area charts, series is { name, data }[]
  return series.some((s) => {
    if (typeof s === 'object' && 'data' in s && Array.isArray(s.data)) {
      return s.data.length > 0
    }
    return false
  })
}

export default function Chart({
  type,
  series,
  categories,
  height = 350,
  width = '100%',
  showLegend = true,
  legendPosition = 'bottom',
  showDataLabels = false,
  showGrid = true,
  title,
  subtitle,
  colors,
  curve = 'smooth',
  stacked = false,
  columnWidth = '55%',
  showToolbar = false,
  enableZoom = false,
  animated = true,
  tooltipFormatter,
  yAxisFormatter,
  labels,
  fillType = 'solid',
  options: customOptions,
  loading = false,
  className,
}: ChartProps): ReactNode {
  const theme = useTheme()
  const { mode } = useThemeStore()
  const isDark = mode === ThemeMode.DARK

  // Theme-aware colors
  const textColor = theme.palette.text.primary
  const gridColor = theme.palette.divider

  // Build chart options
  const chartOptions: ApexOptions = useMemo(() => {
    const defaultColors = [
      theme.palette.primary.main,
      theme.palette.primary.dark,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ]
    const baseOptions: ApexOptions = {
      chart: {
        type: type === 'bar' ? 'bar' : type,
        height,
        background: 'transparent',
        fontFamily: theme.typography.fontFamily,
        toolbar: {
          show: showToolbar,
        },
        zoom: {
          enabled: enableZoom,
        },
        animations: {
          enabled: animated,
          speed: 500,
          dynamicAnimation: {
            enabled: true,
            speed: 300,
          },
        },
        stacked,
      },
      colors: colors ?? defaultColors,
      dataLabels: {
        enabled: showDataLabels,
      },
      stroke: {
        curve,
        width: type === 'area' ? 2 : type === 'line' ? 3 : 0,
      },
      fill: {
        type: fillType,
        ...(fillType === 'gradient' && {
          gradient: {
            shade: isDark ? 'dark' : 'light',
            type: 'vertical',
            shadeIntensity: 0.4,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 100],
          },
        }),
      },
      grid: {
        show: showGrid,
        borderColor: gridColor,
        strokeDashArray: 3,
      },
      xaxis: {
        categories,
        labels: {
          style: {
            colors: textColor,
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: textColor,
            fontSize: '12px',
          },
          formatter: yAxisFormatter,
        },
      },
      legend: {
        show: showLegend,
        position: legendPosition,
        horizontalAlign: 'center',
        labels: {
          colors: textColor,
        },
        markers: {
          size: 6,
          shape: 'circle',
          strokeWidth: 0,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: tooltipFormatter,
        },
      },
      // Note: Don't use theme.mode as it can override custom colors in ApexCharts 4.x
      noData: {
        text: 'No data available',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          color: textColor,
          fontSize: '14px',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth,
          barHeight: '70%',
          borderRadius: 4,
          dataLabels: {
            position: 'top',
          },
        },
        pie: {
          donut: {
            size: type === 'donut' ? '65%' : '0%',
          },
        },
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '24px',
              fontWeight: 600,
            },
          },
        },
      },
      labels,
    }

    // Add title if provided
    if (title) {
      baseOptions.title = {
        text: title,
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 600,
          color: textColor,
        },
      }
    }

    // Add subtitle if provided
    if (subtitle) {
      baseOptions.subtitle = {
        text: subtitle,
        align: 'left',
        style: {
          fontSize: '12px',
          color: theme.palette.text.secondary,
        },
      }
    }

    // Deep merge with custom options
    if (customOptions) {
      return deepMerge(baseOptions, customOptions)
    }

    return baseOptions
  }, [
    type,
    height,
    theme,
    showToolbar,
    enableZoom,
    animated,
    stacked,
    colors,
    showDataLabels,
    curve,
    fillType,
    isDark,
    showGrid,
    gridColor,
    categories,
    textColor,
    yAxisFormatter,
    showLegend,
    legendPosition,
    tooltipFormatter,
    columnWidth,
    labels,
    title,
    subtitle,
    customOptions,
  ])

  // Build bar chart options (simplified to avoid rendering issues)
  const barChartOptions: ApexOptions = useMemo(() => {
    return {
      chart: {
        type: 'bar',
        background: 'transparent',
        toolbar: { show: showToolbar },
        animations: { enabled: animated },
        stacked,
      },
      plotOptions: {
        bar: {
          horizontal: customOptions?.plotOptions?.bar?.horizontal ?? false,
          distributed: customOptions?.plotOptions?.bar?.distributed ?? false,
          columnWidth,
          barHeight: '70%',
          borderRadius: 4,
        },
      },
      xaxis: {
        categories,
        labels: {
          style: { colors: textColor, fontSize: '12px' },
        },
      },
      yaxis: {
        labels: {
          style: { colors: textColor, fontSize: '12px' },
          formatter: yAxisFormatter,
        },
      },
      colors: colors ?? [theme.palette.primary.main],
      dataLabels: { enabled: showDataLabels },
      grid: {
        show: showGrid,
        borderColor: gridColor,
      },
      legend: {
        show: showLegend,
        position: legendPosition,
        labels: { colors: textColor },
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
      },
    }
  }, [
    showToolbar,
    animated,
    stacked,
    customOptions,
    columnWidth,
    categories,
    textColor,
    yAxisFormatter,
    colors,
    theme,
    showDataLabels,
    showGrid,
    gridColor,
    showLegend,
    legendPosition,
    isDark,
  ])

  // Choose the right options based on chart type
  const finalOptions = type === 'bar' ? barChartOptions : chartOptions

  // Show loading state
  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        className={className}
        sx={{ borderRadius: 1 }}
      />
    )
  }

  // Show empty state if no data
  if (!hasData(series)) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: typeof height === 'number' ? height : 200 }}
      >
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        minHeight: typeof height === 'number' ? height : 200,
        width: '100%',
      }}
    >
      <ReactApexChart
        options={finalOptions}
        series={series}
        type={type}
        height={height}
        width={width}
      />
    </div>
  )
}

// Deep merge utility
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target }
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = target[key]
      
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          targetValue as object,
          sourceValue as object
        )
      } else {
        (result as Record<string, unknown>)[key] = sourceValue
      }
    }
  }
  
  return result
}

