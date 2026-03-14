import { useDashboardSummary } from "../hooks/useDashboardSummary"

import SummaryCard from "../components/summary-card"
import DashboardSkeleton from "../components/dashboard-skeleton"
import InvoiceStatusChart from "../components/invoice-status-chart"
import LatestInvoicesTable from "../components/latest-invoices-table"
import { formatRupiah } from "../../../shared/utils/format-currency"

export default function DashboardPage() {

  const { data, isLoading, error } = useDashboardSummary()

  if (isLoading) return <DashboardSkeleton />

  if (error) return (
    <div className="p-6 border border-red-200 bg-red-50 rounded-lg text-center space-y-2">
      <p className="text-red-600 font-semibold">Gagal memuat data dashboard</p>
      <p className="text-sm text-red-400">
        {error instanceof Error ? error.message : "Terjadi kesalahan tak terduga"}
      </p>
      <p className="text-xs text-gray-400">Silakan refresh halaman atau coba beberapa saat lagi</p>
    </div>
  )

  if (!data) return null

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-4 gap-4">
        <SummaryCard title="Revenue" value={formatRupiah(data.totalRevenue)} />
        <SummaryCard title="Unpaid" value={formatRupiah(data.totalUnpaid)} />
        <SummaryCard title="Overdue" value={formatRupiah(data.totalOverdue)} />
        <SummaryCard title="Invoice This Month" value={data.totalInvoiceThisMonth} />
      </div>

      <InvoiceStatusChart distribution={data.statusDistribution} />
      <LatestInvoicesTable invoices={data.latestInvoices} />

    </div>
  )
}