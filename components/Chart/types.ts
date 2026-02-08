import type { ApexOptions } from 'apexcharts'

// ==============================|| CHART TYPES ||============================== //

export type ChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'heatmap'

export interface ChartSeries {
  name: string
  data: number[] | { x: string | number | Date; y: number }[]
}

export interface ChartProps {
  /** Chart type */
  type: ChartType
  /** Chart series data */
  series: ChartSeries[] | number[]
  /** X-axis categories */
  categories?: string[]
  /** Chart height */
  height?: number | string
  /** Chart width */
  width?: number | string
  /** Show legend */
  showLegend?: boolean
  /** Legend position */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Show data labels */
  showDataLabels?: boolean
  /** Show grid */
  showGrid?: boolean
  /** Chart title */
  title?: string
  /** Subtitle */
  subtitle?: string
  /** Custom colors */
  colors?: string[]
  /** Curve type for line/area charts */
  curve?: 'smooth' | 'straight' | 'stepline'
  /** Stacked chart */
  stacked?: boolean
  /** Column width for bar charts */
  columnWidth?: string
  /** Enable toolbar */
  showToolbar?: boolean
  /** Enable zoom */
  enableZoom?: boolean
  /** Enable animations */
  animated?: boolean
  /** Custom formatter for tooltip */
  tooltipFormatter?: (value: number) => string
  /** Custom formatter for y-axis labels */
  yAxisFormatter?: (value: number) => string
  /** Chart labels (for pie/donut charts) */
  labels?: string[]
  /** Fill type */
  fillType?: 'solid' | 'gradient' | 'pattern'
  /** Custom ApexCharts options (deep merged) */
  options?: ApexOptions
  /** Loading state */
  loading?: boolean
  /** Class name */
  className?: string
}

