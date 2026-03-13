import { z } from "zod"

export const invoiceItemSchema = z.object({
  name: z.string().min(1, "Nama layanan wajib diisi"),
  qty: z.coerce
    .number({ error: "Qty harus berupa angka" })
    .int("Qty harus bilangan bulat")
    .positive("Qty harus lebih dari 0"),
  unit: z.string().min(1, "Unit wajib diisi"),
  price: z.coerce
    .number({ error: "Harga harus berupa angka" })
    .positive("Harga harus lebih dari 0"),
})

export const createInvoiceSchema = z.object({
  customer_id: z.string().min(1, "Customer wajib dipilih"),
  due_date: z.string().refine((val) => {
    if (!val) return false
    const date = new Date(val)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, "Due date tidak boleh di masa lalu"),
  status: z.enum(["draft", "unpaid"]),
  items: z.array(invoiceItemSchema).min(1, "Minimal 1 item layanan"),
})

export type CreateInvoiceInput = z.input<typeof createInvoiceSchema>
export type CreateInvoiceFormData = z.output<typeof createInvoiceSchema>