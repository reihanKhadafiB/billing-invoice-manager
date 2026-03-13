import { Link, useParams } from "react-router-dom"
import { useInvoiceDetail } from "../hooks/useInvoiceDetail"
import { customers } from "../../../mocks/data/customers"
import { formatRupiah } from "../../../shared/utils/format-currency"
import { toast } from "sonner"

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { query, mutation } = useInvoiceDetail(id ?? "")
  const { data: invoice, isLoading, error } = query

  // loading state
  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  )

  // error state
  if (error || !invoice) return (
    <div className="text-center py-20 space-y-3">
      <p className="text-4xl">🔍</p>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Invoice tidak ditemukan</p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {error instanceof Error ? error.message : `Invoice ${id} tidak tersedia`}
      </p>
    </div>
  )

  const customer = customers.find((c) => c.id === invoice.customer_id)
  const total = invoice.items.reduce((acc, item) => acc + item.qty * item.price, 0)
  const canMarkAsPaid = invoice.status === "unpaid" || invoice.status === "overdue"

  return (
    <div className="space-y-6 max-w-3xl">

      {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{invoice.id}</h1>
        <span className="px-3 py-1 rounded-full text-sm border dark:border-gray-700 text-gray-700 dark:text-gray-300">
          {invoice.status}
        </span>
      </div>

      {/* info customer */}
      <section className="border dark:border-gray-700 rounded-lg p-4 space-y-1 bg-white dark:bg-gray-800/50">
        <h2 className="font-semibold text-gray-600 dark:text-gray-400 text-sm">Info Customer</h2>
        <Link
          to={`/customers/${invoice.customer_id}`}
          className="font-medium hover:underline text-blue-600 dark:text-blue-400">
          {customer?.name ?? invoice.customer_id}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">{customer?.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Plan: {customer?.plan}</p>
      </section>

      {/* breakdown items */}
      <section className="border dark:border-gray-700 rounded-lg p-4 space-y-3 bg-white dark:bg-gray-800/50">
        <h2 className="font-semibold text-gray-600 dark:text-gray-400 text-sm">Breakdown Item</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="pb-2">Layanan</th>
              <th className="pb-2">Qty</th>
              <th className="pb-2">Unit</th>
              <th className="pb-2">Harga Satuan</th>
              <th className="pb-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-t dark:border-gray-700">
                <td className="py-2 text-gray-800 dark:text-gray-200">{item.name}</td>
                <td className="py-2 text-gray-800 dark:text-gray-200">{item.qty}</td>
                <td className="py-2 text-gray-800 dark:text-gray-200">{item.unit}</td>
                <td className="py-2 text-gray-800 dark:text-gray-200">{formatRupiah(item.price)}</td>
                <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatRupiah(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* total */}
        <div className="border-t dark:border-gray-700 pt-3 flex justify-between font-semibold text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
      </section>

      {/* actions */}
      <div className="flex gap-3">

        {canMarkAsPaid && (
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50">
            {mutation.isPending ? "Memproses..." : "Tandai Lunas"}
          </button>
        )}

        <button
          onClick={() => {
            toast.info("Mempersiapkan download...", {
              description: `${invoice.id}.pdf`
            })
            console.log("Download PDF:", invoice.id)
          }}
          className="px-4 py-2 border dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
          Download PDF
        </button>

      </div>

      {/* mutation error */}
      {mutation.isError && (
        <p className="text-sm text-red-500">
          Gagal memperbarui status:{" "}
          {mutation.error instanceof Error ? mutation.error.message : "Terjadi kesalahan"}
        </p>
      )}

    </div>
  )
}