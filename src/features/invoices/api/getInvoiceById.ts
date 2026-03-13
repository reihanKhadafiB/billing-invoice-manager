import { invoices } from "../../../mocks/data/invoices"
import type { Invoice } from "../types/invoice"

export async function getInvoiceById(id: string): Promise<Invoice> {
  await new Promise((r) => setTimeout(r, 500))

  const invoice = invoices.find((i) => i.id === id)

  if (!invoice) {
    throw new Error(`Invoice ${id} tidak ditemukan`)
  }

  return invoice
}