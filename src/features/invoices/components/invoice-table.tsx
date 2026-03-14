import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table"
import { useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { customers } from "../../../mocks/data/customers"
import { formatRupiah } from "../../../shared/utils/format-currency"
import type { Invoice } from "../types/invoice"

type Props = {
  invoices: Invoice[]
  sort?: "due_date" | "amount"
  order?: "asc" | "desc"
}

const columnHelper = createColumnHelper<Invoice>()

export default function InvoiceTable({ invoices, sort, order }: Props) {
  const [, setParams] = useSearchParams()

  const sorting: SortingState = useMemo(() => {
    if (!sort) return []
    return [{ id: sort, desc: order === "desc" }]
  }, [sort, order])

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Invoice ID",
        enableSorting: false,
        cell: (info) => (
          <Link
            to={`/invoices/${info.getValue()}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("customer_id", {
        header: "Customer",
        enableSorting: false,
        cell: (info) =>
          customers.find((c) => c.id === info.getValue())?.name ?? info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        enableSorting: true,
        cell: (info) => formatRupiah(info.getValue()),
      }),
      columnHelper.accessor("due_date", {
        header: "Due Date",
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        enableSorting: false,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: invoices,
    columns,
    state: { sorting },
    manualSorting: true,
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater
      setParams((prev) => {
        const params = new URLSearchParams(prev)
        if (next.length === 0) {
          params.delete("sort")
          params.delete("order")
        } else {
          params.set("sort", next[0].id)
          params.set("order", next[0].desc ? "desc" : "asc")
        }
        params.set("page", "1")
        return params
      })
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full border dark:border-gray-700">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-gray-100 dark:bg-gray-800">
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort()
              const sorted = header.column.getIsSorted()
              return (
                <th
                  key={header.id}
                  className={`p-2 text-left text-gray-700 dark:text-gray-300 select-none ${
                    canSort
                      ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      : ""
                  }`}
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}>
                  <span className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {canSort && (
                      <span className="text-xs text-gray-400">
                        {sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : "↕"}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-t dark:border-gray-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 text-gray-800 dark:text-gray-200">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}