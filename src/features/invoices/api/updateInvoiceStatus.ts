import { invoices, persistInvoices } from "../../../mocks/data/invoices"
import type { Invoice, InvoiceStatus } from "../types/invoice"

type Payload = {
  id: string
  status: InvoiceStatus
}

export async function updateInvoiceStatus({ id, status }: Payload): Promise<Invoice> {
  await new Promise((r) => setTimeout(r, 800))
  const index = invoices.findIndex((i) => i.id === id)
  if (index === -1) throw new Error("Invoice tidak ditemukan")
  invoices[index] = { ...invoices[index], status }
  persistInvoices()

  return invoices[index]
}