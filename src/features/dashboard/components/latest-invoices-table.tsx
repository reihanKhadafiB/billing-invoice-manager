import { Link } from "react-router-dom"
import type { Invoice } from "../../invoices/types/invoice"
import { customers } from "../../../mocks/data/customers"
import { formatRupiah } from "../../../shared/utils/format-currency"

type Props = {
  invoices: Invoice[]
}

export default function LatestInvoicesTable({ invoices }: Props) {

  const getCustomerName = (id: string) =>
   customers.find((c) => c.id === id)?.name ?? id

  const latest = [...invoices]
    .sort(
      (a, b) => {
      return b.id.localeCompare(a.id)
    })
    .slice(0, 5)

  return (
    <table className="w-full border dark:border-gray-700">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Invoice</th>
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Customer</th>
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Status</th>
        </tr>
      </thead>

      <tbody>
        {latest.map((invoice) => (
          <tr key={invoice.id} className="border-t dark:border-gray-700">
            <td className="p-2 text-gray-800 dark:text-gray-200">
              <Link to={`/invoices/${invoice.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {invoice.id}
              </Link>
            </td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{getCustomerName(invoice.customer_id)}</td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{formatRupiah(invoice.amount)}</td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{invoice.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}