export type InvoiceItem = {
  name: string
  qty: number
  unit: string
  price: number
}

export type InvoiceStatus =
  | "paid"
  | "unpaid"
  | "overdue"
  | "draft"

// export type Invoice = {
//   id: string
//   customer_id: string
//   status: "paid" | "unpaid" | "overdue" | "draft"
//   amount: number
//   due_date: string
//   items: InvoiceItem[]
// }

export type Invoice = {
  id: string
  customer_id: string
  status: InvoiceStatus
  amount: number
  due_date: string
  items: InvoiceItem[]
}