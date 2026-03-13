import { useParams, Link } from "react-router-dom"
import { useCustomerProfile } from "../hooks/useCustomerProfile"
import { formatRupiah } from "../../../shared/utils/format-currency"

export default function CustomerProfilePage() {
  const { id } = useParams<{ id: string }>()
  const {
    customerQuery,
    invoicesQuery,
    totalSpent,
    invoiceCountByStatus,
    isLoading,
    isError,
    error,
  } = useCustomerProfile(id ?? "")

  // loading state
  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-32 bg-gray-200 rounded" />
      <div className="h-48 bg-gray-200 rounded" />
    </div>
  )

  // error state
  if (isError || !customerQuery.data) return (
    <div className="text-center py-20 space-y-3">
      <p className="text-4xl">🔍</p>
      <p className="text-xl font-semibold text-gray-700">Customer tidak ditemukan</p>
      <p className="text-sm text-gray-400">
        {error instanceof Error ? error.message : "Terjadi kesalahan"}
      </p>
    </div>
  )

  const customer = customerQuery.data
  const invoices = invoicesQuery.data ?? []

  return (
    <div className="space-y-6 max-w-3xl">

      {/* header */}
      <h1 className="text-2xl font-bold">Profil Customer</h1>

      {/* info customer */}
      <section className="border rounded-lg p-4 space-y-2">
        <h2 className="font-semibold text-gray-600 text-sm">Info Customer</h2>
        <p className="text-xl font-bold">{customer.name}</p>
        <p className="text-sm text-gray-500">{customer.email}</p>
        <span className="inline-block text-xs px-2 py-1 bg-blue-50 
                         text-blue-600 rounded-full border border-blue-200">
          Plan: {customer.plan}
        </span>
      </section>

      {/* summary stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 space-y-1">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-green-600">
            {formatRupiah(totalSpent)}
          </p>
        </div>
        <div className="border rounded-lg p-4 space-y-1">
          <p className="text-sm text-gray-500">Total Invoice</p>
          <p className="text-xl font-bold">{invoices.length}</p>
        </div>
      </section>

      {/* invoice per status */}
      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-gray-600 text-sm">Invoice per Status</h2>
        <div className="grid grid-cols-4 gap-3">
          {Object.entries(invoiceCountByStatus).map(([status, count]) => (
            <div key={status} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs text-gray-500 capitalize">{status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* invoice list */}
      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-gray-600 text-sm">
          Riwayat Invoice ({invoices.length})
        </h2>

        {invoices.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Belum ada invoice
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Invoice ID</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Due Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t">
                  <td className="py-2">
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {invoice.id}
                    </Link>
                  </td>
                  <td className="py-2">{formatRupiah(invoice.amount)}</td>
                  <td className="py-2">{invoice.due_date}</td>
                  <td className="py-2 capitalize">{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

    </div>
  )
}