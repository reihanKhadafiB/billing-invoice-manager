import { customers } from "../../../mocks/data/customers"

export type Customer = {
  id: string
  name: string
  email: string
  plan: string
}

export async function getCustomerById(id: string): Promise<Customer> {
  await new Promise((r) => setTimeout(r, 400))

  const customer = customers.find((c) => c.id === id)

  if (!customer) throw new Error(`Customer ${id} tidak ditemukan`)

  return customer
}