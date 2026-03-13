// features/customers/hooks/useCustomerProfile.ts
import { useQueries } from "@tanstack/react-query"
import { getCustomerById } from "../api/getCustomerById"
import { getInvoicesByCustomer } from "../../invoices/api/getInvoicesByCustomer"

export function useCustomerProfile(customerId: string) {
  const [customerQuery, invoicesQuery] = useQueries({
    queries: [
      {
        queryKey: ["customers", customerId],
        queryFn: () => getCustomerById(customerId),
        enabled: !!customerId,
      },
      {
        queryKey: ["invoices", "by-customer", customerId],
        queryFn: () => getInvoicesByCustomer(customerId),
        enabled: !!customerId,
      },
    ],
  })
  
  const invoices = invoicesQuery.data ?? []

  const totalSpent = invoices
    .filter((i) => i.status === "paid")
    .reduce((acc, i) => acc + i.amount, 0)

  const invoiceCountByStatus = {
    paid: invoices.filter((i) => i.status === "paid").length,
    unpaid: invoices.filter((i) => i.status === "unpaid").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
    draft: invoices.filter((i) => i.status === "draft").length,
  }

  return {
    customerQuery,
    invoicesQuery,
    totalSpent,
    invoiceCountByStatus,
    isLoading: customerQuery.isLoading || invoicesQuery.isLoading,
    isError: customerQuery.isError || invoicesQuery.isError,
    error: customerQuery.error ?? invoicesQuery.error,
  }
}