import { invoices } from "../../../mocks/data/invoices"
import type { Invoice } from "../types/invoice"

export async function getInvoicesByCustomer(customerId: string): Promise<Invoice[]> {
  await new Promise((r) => setTimeout(r, 400))
  return invoices.filter((i) => i.customer_id === customerId)
}