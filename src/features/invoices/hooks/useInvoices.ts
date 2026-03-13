import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getInvoices } from "../api/getInvoices"
import type { InvoiceQueryParams } from "../types/invoice-query"
import type { Invoice } from "../types/invoice"

type InvoiceResponse = {
  data: Invoice[]
  total: number
}

export function useInvoices(params: InvoiceQueryParams) {
  return useQuery<InvoiceResponse>({
    queryKey: ["invoices", params],
    queryFn: () => getInvoices(params),
    placeholderData: keepPreviousData
  })
}