import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import { useAuthUser } from '@modules/auth'
import { Table } from '@components/Table'
import { Chart } from '@components/Chart'
import type { Column, SmartAction, SortDirection } from '@components/Table'

// Sample data types
interface Order {
  id: number
  orderNo: string
  customer: string
  product: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  date: string
}

// Sample data
const sampleOrders: Order[] = [
  { id: 1, orderNo: 'ORD-001', customer: 'John Doe', product: 'Widget Pro', amount: 299.99, status: 'completed', date: '2024-01-15' },
  { id: 2, orderNo: 'ORD-002', customer: 'Jane Smith', product: 'Gadget Plus', amount: 149.99, status: 'pending', date: '2024-01-14' },
  { id: 3, orderNo: 'ORD-003', customer: 'Bob Johnson', product: 'Device Max', amount: 499.99, status: 'completed', date: '2024-01-13' },
  { id: 4, orderNo: 'ORD-004', customer: 'Alice Brown', product: 'Tool Basic', amount: 79.99, status: 'cancelled', date: '2024-01-12' },
  { id: 5, orderNo: 'ORD-005', customer: 'Charlie Wilson', product: 'Widget Pro', amount: 299.99, status: 'pending', date: '2024-01-11' },
  { id: 6, orderNo: 'ORD-006', customer: 'Diana Lee', product: 'Gadget Plus', amount: 149.99, status: 'completed', date: '2024-01-10' },
]

export default function Dashboard() {
  const user = useAuthUser()
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState<string>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // Table columns
  const columns: Column<Order>[] = [
    { id: 'orderNo', label: 'Order #', accessor: 'orderNo', sortable: true, sticky: 'left' },
    { id: 'customer', label: 'Customer', accessor: 'customer', sortable: true },
    { id: 'product', label: 'Product', accessor: 'product', sortable: true },
    {
      id: 'amount',
      label: 'Amount',
      accessor: 'amount',
      sortable: true,
      align: 'right',
      render: (value) => `$${(value as number).toFixed(2)}`,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      sortable: true,
      render: (value) => {
        const colorMap = {
          pending: 'text-yellow-600 bg-yellow-100',
          completed: 'text-green-600 bg-green-100',
          cancelled: 'text-red-600 bg-red-100',
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[value as keyof typeof colorMap]}`}>
            {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
          </span>
        )
      },
    },
    { id: 'date', label: 'Date', accessor: 'date', sortable: true },
  ]

  // Smart actions
  const smartActions: SmartAction<Order>[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditOutlinedIcon fontSize="small" />,
      onClick: (row) => console.log('Edit', row),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteOutlineIcon fontSize="small" />,
      onClick: (row) => console.log('Delete', row),
      color: 'error',
      divider: true,
    },
    {
      id: 'mark-inactive',
      label: 'Mark Inactive',
      icon: <BlockOutlinedIcon fontSize="small" />,
      onClick: (row) => console.log('Mark inactive', row),
      disabled: (row) => row.status === 'cancelled',
    },
  ]

  // Chart data
  const areaChartData = [
    { name: 'Page Views', data: [31, 40, 28, 51, 42, 109, 100, 91, 69, 62, 105, 38] },
    { name: 'Sessions', data: [11, 32, 45, 32, 34, 52, 41, 28, 34, 52, 87, 52] },
  ]

  const barChartData = [{ name: 'Statistics', data: [80, 95, 70, 42, 65, 55, 78] }]

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your projects today.
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', value: '78,250', change: '+70.5%', positive: true },
          { title: 'Total Orders', value: '18,800', change: '+27.4%', positive: true },
          { title: 'Total Sales', value: '$35,078', change: '-27.4%', positive: false },
          { title: 'Total Marketing', value: '$1,12,083', change: '+70.5%', positive: true },
        ].map((stat) => (
          <Paper key={stat.title} className="p-5">
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stat.title}
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="h4" fontWeight={600}>
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                className={stat.positive ? 'text-green-500' : 'text-red-500'}
              >
                {stat.change}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <Paper className="p-6 lg:col-span-2">
          <Chart
            type="area"
            series={areaChartData}
            categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            height={350}
            fillType="gradient"
            showLegend
            legendPosition="bottom"
          />
        </Paper>

        {/* Bar Chart */}
        <Paper className="p-6">
          <Typography variant="h6" gutterBottom>
            This Week Statistics
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            $7,650
          </Typography>
          <Chart
            type="bar"
            series={barChartData}
            categories={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
            height={280}
            showLegend={false}
            showGrid={false}
          />
        </Paper>
      </div>

      {/* Table Section */}
      <Paper className="p-6">
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <Table
          data={sampleOrders}
          columns={columns}
          rowKey="id"
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortable
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(col, dir) => {
            setSortBy(col)
            setSortDirection(dir)
          }}
          pagination
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          smartActions={smartActions}
          stickyHeader
          maxHeight={400}
        />
      </Paper>
    </div>
  )
}
