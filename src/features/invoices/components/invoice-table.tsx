import type { Invoice } from "../types/invoice"
import { formatRupiah } from "../../../shared/utils/format-currency" 
import { Link, useSearchParams } from "react-router-dom"
import { customers } from "../../../mocks/data/customers"

type Props = {
  invoices: Invoice[]
  sort?: "due_date" | "amount"
  order?: "asc" | "desc"
}

export default function InvoiceTable({ invoices }: Props) {

    const [params, setParams] = useSearchParams()
    const handleSort = (column: "amount" | "due_date") => {
        const newParams = new URLSearchParams(params)
        const currentSort = params.get("sort")
        const currentOrder = params.get("order")

        let nextOrder = "asc"

        if (currentSort === column && currentOrder === "asc") {
            nextOrder = "desc"
        }

        newParams.set("sort", column)
        newParams.set("order", nextOrder)
        newParams.set("page", "1")

        setParams(newParams)
    }

    const getCustomerName = (id: string) =>
      customers.find((c) => c.id === id)?.name ?? id

  return (
    <table className="w-full border dark:border-gray-700">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Invoice ID</th>
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Customer</th>
          <th
              className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={() => handleSort("amount")}>
              Amount
              </th>
              <th
              className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={() => handleSort("due_date")}>
              Due Date
          </th>
          <th className="p-2 text-left text-gray-700 dark:text-gray-300">Status</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="border-t dark:border-gray-700">
            <td className="p-2 text-gray-800 dark:text-gray-200">
              <Link to={`/invoices/${invoice.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">{invoice.id}</Link>
            </td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{getCustomerName(invoice.customer_id)}</td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{formatRupiah(invoice.amount)}</td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{invoice.due_date}</td>
            <td className="p-2 text-gray-800 dark:text-gray-200">{invoice.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}