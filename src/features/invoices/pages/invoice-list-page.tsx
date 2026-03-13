import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"  // ← tambahkan
import { useInvoices } from "../hooks/useInvoices"
import InvoiceTable from "../components/invoice-table"
import InvoiceSearch from "../components/invoice-search"
import InvoiceFilter from "../components/invoice-filter"
import InvoicePagination from "../components/invoice-pagination"
import type { InvoiceStatus } from "../types/invoice"
import { useQueryClient } from "@tanstack/react-query"
import { getInvoices } from "../api/getInvoices"

export default function InvoiceListPage() {
  const [params, setParams] = useSearchParams()

  const page = Number(params.get("page") ?? 1)
  const search = params.get("search") ?? undefined
  const statusParam = params.get("status")
  const status: InvoiceStatus | undefined =
    statusParam === "paid" || statusParam === "unpaid" ||
    statusParam === "overdue" || statusParam === "draft"
      ? statusParam : undefined

  const sortParam = params.get("sort")
  const orderParam = params.get("order")
  const sort = sortParam === "amount" || sortParam === "due_date" ? sortParam : undefined
  const order = orderParam === "asc" || orderParam === "desc" ? orderParam : undefined

  const { data, isLoading } = useInvoices({ page, limit: 10, search, status, sort, order })
  const queryClient = useQueryClient()

  const handlePageChange = useCallback((newPage: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set("page", String(newPage))
      return next
    })
  }, [setParams])

  const handleFilterChange = useCallback((status: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (status === "all") next.delete("status")
      else next.set("status", status)
      next.set("page", "1")
      return next
    })
  }, [setParams])

  const handleSearchChange = useCallback((search: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (search) next.set("search", search)
      else next.delete("search")
      next.set("page", "1")
      return next
    })
  }, [setParams])

  const handleNextPageHover = useCallback(() => {
    const totalPages = Math.ceil((data?.total ?? 0) / 10)
    if (page >= totalPages) return
    queryClient.prefetchQuery({
      queryKey: ["invoices", { page: page + 1, limit: 10, search, status, sort, order }],
      queryFn: () => getInvoices({ page: page + 1, limit: 10, search, status, sort, order })
    })
  }, [data, page, search, status, sort, order, queryClient])

  if (isLoading) return <div className="text-gray-700 dark:text-gray-300">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <InvoiceSearch
          value={search ?? ""}
          onChange={handleSearchChange}/>
        <InvoiceFilter
          value={statusParam ?? "all"}
          onChange={handleFilterChange}/>
      </div>

      <InvoiceTable invoices={data?.data ?? []} sort={sort} order={order} />

      <InvoicePagination
        page={page}
        total={data?.total ?? 0}
        limit={10}
        onPageChange={handlePageChange}
        onNextPageHover={handleNextPageHover}/>
    </div>
  )
}