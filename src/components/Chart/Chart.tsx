import { useMemo } from 'react'
import type { ReactNode } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTheme } from '@mui/material/styles'
import Skeleton from '@mui/material/Skeleton'
import type { ApexOptions } from 'apexcharts'
import type { ChartProps } from './types'
import { useThemeStore } from '@store/useThemeStore'
import { ThemeMode } from '@config/index'

// ==============================|| REUSABLE CHART ||============================== //

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
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ]

  // Build chart options
  const chartOptions: ApexOptions = useMemo(() => {
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
      theme: {
        mode: isDark ? 'dark' : 'light',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth,
          borderRadius: 4,
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
    defaultColors,
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

  return (
    <div className={className}>
      <ReactApexChart
        options={chartOptions}
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

