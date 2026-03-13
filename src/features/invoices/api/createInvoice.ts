import { invoices } from "../../../mocks/data/invoices"
import type { Invoice } from "../types/invoice"
import type { CreateInvoiceFormData } from "../types/invoice-form"

export async function createInvoice(data: CreateInvoiceFormData): Promise<Invoice> {
  await new Promise((r) => setTimeout(r, 800))

  const year = new Date().getFullYear()
  const lastId = invoices
    .filter((i) => i.id.startsWith(`INV-${year}`))
    .length + 1
  const newId = `INV-${year}-${String(lastId).padStart(3, "0")}`

  const amount = data.items.reduce(
    (acc, item) => acc + item.qty * item.price, 0
  )

  const newInvoice: Invoice = {
    id: newId,
    customer_id: data.customer_id,
    status: data.status,
    amount,
    due_date: data.due_date,
    items: data.items,
  }

  invoices.push(newInvoice)

  return newInvoice
}