export type InvoiceQueryParams = {
  page: number
  limit: number
  status?: "paid" | "unpaid" | "overdue" | "draft"
  sort?: "due_date" | "amount"
  order?: "asc" | "desc"
  search?: string
}