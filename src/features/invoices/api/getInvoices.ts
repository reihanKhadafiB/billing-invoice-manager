import { customers } from "../../../mocks/data/customers"
import { invoices } from "../../../mocks/data/invoices"
import type { Invoice } from "../types/invoice"
import type { InvoiceQueryParams } from "../types/invoice-query"

export async function getInvoices(
  params: InvoiceQueryParams
): Promise<{
  data: Invoice[]
  total: number
}> {

  await new Promise((r) => setTimeout(r, 500))
  let result = [...invoices]

  // FILTER
  if (params.status) {
    result = result.filter(i => i.status === params.status)
  }

  // SEARCH
  if (params.search) {
    const keyword = params.search.toLowerCase()
    result = result.filter(i => {
      const customer = customers.find(c => c.id === i.customer_id)
      return (
        i.id.toLowerCase().includes(keyword) ||
        customer?.name.toLowerCase().includes(keyword)
      )
    })
  }

  // SORT
  if (params.sort) {
    result.sort((a,b)=>{
      const dir = params.order === "desc" ? -1 : 1

      if (params.sort === "amount")
        return (a.amount - b.amount) * dir

      if (params.sort === "due_date")
        return (
          new Date(a.due_date).getTime() -
          new Date(b.due_date).getTime()
        ) * dir

      return 0
    })
  }

  const total = result.length

  // PAGINATION
  const start = (params.page - 1) * params.limit
  const end = start + params.limit

  result = result.slice(start, end)

  return {
    data: result,
    total
  }
}