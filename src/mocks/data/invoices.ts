import type { Invoice } from "../../features/invoices/types/invoice"

const STORAGE_KEY = "mock_invoices"

const initialInvoices: Invoice[] = [
{
    id: "INV-2024-001",
    customer_id: "cust-01",
    status: "paid",
    amount: 2450000,
    due_date: "2024-12-31",
    items: [
      { name: "Compute 4vCPU", qty: 30, unit: "days", price: 50000 },
      { name: "Storage SSD 100GB", qty: 30, unit: "days", price: 31667 }
    ]
  },
  {
    id: "INV-2024-002",
    customer_id: "cust-02",
    status: "unpaid",
    amount: 1875000,
    due_date: "2025-01-15",
    items: [
      { name: "Compute 2vCPU", qty: 25, unit: "days", price: 35000 },
      { name: "Network Bandwidth 1TB", qty: 1, unit: "month", price: 1000000 }
    ]
  },
  {
    id: "INV-2024-003",
    customer_id: "cust-03",
    status: "overdue",
    amount: 5200000,
    due_date: "2024-11-30",
    items: [
      { name: "Compute 8vCPU", qty: 30, unit: "days", price: 120000 },
      { name: "Storage SSD 500GB", qty: 30, unit: "days", price: 53333 }
    ]
  },
  {
    id: "INV-2024-004",
    customer_id: "cust-01",
    status: "draft",
    amount: 980000,
    due_date: "2025-02-28",
    items: [
      { name: "Object Storage 1TB", qty: 1, unit: "month", price: 980000 }
    ]
  },
  {
    id: "INV-2024-005",
    customer_id: "cust-04",
    status: "paid",
    amount: 3750000,
    due_date: "2024-12-15",
    items: [
      { name: "Compute 4vCPU", qty: 30, unit: "days", price: 50000 },
      { name: "Managed Database", qty: 1, unit: "month", price: 2250000 }
    ]
  },
  {
    id: "INV-2024-006",
    customer_id: "cust-05",
    status: "unpaid",
    amount: 620000,
    due_date: "2025-01-31",
    items: [
      { name: "Compute 1vCPU", qty: 20, unit: "days", price: 18000 },
      { name: "Storage SSD 50GB", qty: 20, unit: "days", price: 13000 }
    ]
  },
  {
    id: "INV-2024-007",
    customer_id: "cust-02",
    status: "paid",
    amount: 8900000,
    due_date: "2024-12-01",
    items: [
      { name: "Compute 16vCPU", qty: 30, unit: "days", price: 220000 },
      { name: "Network Load Balancer", qty: 1, unit: "month", price: 1300000 }
    ]
  },
  {
    id: "INV-2024-008",
    customer_id: "cust-03",
    status: "overdue",
    amount: 2100000,
    due_date: "2024-10-31",
    items: [
      { name: "Compute 4vCPU", qty: 14, unit: "days", price: 50000 },
      { name: "Managed Database", qty: 1, unit: "month", price: 1400000 }
    ]
  },
  {
    id: "INV-2025-001",
    customer_id: "cust-06",
    status: "unpaid",
    amount: 4450000,
    due_date: "2025-02-15",
    items: [
      { name: "Compute 8vCPU", qty: 30, unit: "days", price: 120000 },
      { name: "Storage SSD 200GB", qty: 30, unit: "days", price: 25000 }
    ]
  },
  {
    id: "INV-2025-002",
    customer_id: "cust-04",
    status: "draft",
    amount: 1560000,
    due_date: "2025-03-01",
    items: [
      { name: "Compute 2vCPU", qty: 30, unit: "days", price: 35000 },
      { name: "Network Bandwidth 500GB", qty: 1, unit: "month", price: 510000 }
    ]
  },
  {
    id: "INV-2025-003",
    customer_id: "cust-01",
    status: "paid",
    amount: 6750000,
    due_date: "2025-01-20",
    items: [
      { name: "Compute 8vCPU", qty: 30, unit: "days", price: 120000 },
      { name: "Managed Database", qty: 1, unit: "month", price: 3150000 }
    ]
  },
  {
    id: "INV-2025-004",
    customer_id: "cust-05",
    status: "overdue",
    amount: 890000,
    due_date: "2025-01-05",
    items: [
      { name: "Compute 2vCPU", qty: 15, unit: "days", price: 35000 },
      { name: "Storage SSD 100GB", qty: 15, unit: "days", price: 14333 }
    ]
  },
  {
    id: "INV-2025-005",
    customer_id: "cust-06",
    status: "unpaid",
    amount: 2300000,
    due_date: "2025-02-28",
    items: [
      { name: "Compute 4vCPU", qty: 20, unit: "days", price: 50000 },
      { name: "Object Storage 500GB", qty: 1, unit: "month", price: 1300000 }
    ]
  },
  {
    id: "INV-2025-006",
    customer_id: "cust-02",
    status: "paid",
    amount: 11200000,
    due_date: "2025-01-31",
    items: [
      { name: "Compute 16vCPU", qty: 30, unit: "days", price: 220000 },
      { name: "Managed Database", qty: 1, unit: "month", price: 4600000 }
    ]
  },
  {
    id: "INV-2025-007",
    customer_id: "cust-03",
    status: "draft",
    amount: 3200000,
    due_date: "2025-03-15",
    items: [
      { name: "Compute 4vCPU", qty: 30, unit: "days", price: 50000 },
      { name: "Network Bandwidth 2TB", qty: 1, unit: "month", price: 1700000 }
    ]
  },
  {
    id: "INV-2025-008",
    customer_id: "cust-07",
    status: "unpaid",
    amount: 780000,
    due_date: "2025-02-10",
    items: [
      { name: "Compute 1vCPU", qty: 30, unit: "days", price: 18000 },
      { name: "Storage SSD 50GB", qty: 30, unit: "days", price: 8000 }
    ]
  },
  {
    id: "INV-2025-009",
    customer_id: "cust-07",
    status: "paid",
    amount: 5500000,
    due_date: "2025-01-15",
    items: [
      { name: "Compute 8vCPU", qty: 25, unit: "days", price: 120000 },
      { name: "Managed Database", qty: 1, unit: "month", price: 2500000 }
    ]
  },
  {
    id: "INV-2025-010",
    customer_id: "cust-04",
    status: "overdue",
    amount: 1450000,
    due_date: "2025-01-01",
    items: [
      { name: "Compute 2vCPU", qty: 30, unit: "days", price: 35000 },
      { name: "Storage SSD 100GB", qty: 30, unit: "days", price: 13333 }
    ]
  },
  {
    id: "INV-2025-011",
    customer_id: "cust-05",
    status: "paid",
    amount: 9800000,
    due_date: "2025-02-01",
    items: [
      { name: "Compute 16vCPU", qty: 28, unit: "days", price: 220000 },
      { name: "Network Load Balancer", qty: 1, unit: "month", price: 3640000 }
    ]
  },
  {
    id: "INV-2025-012",
    customer_id: "cust-06",
    status: "draft",
    amount: 2750000,
    due_date: "2025-03-31",
    items: [
      { name: "Compute 4vCPU", qty: 30, unit: "days", price: 50000 },
      { name: "Object Storage 1TB", qty: 1, unit: "month", price: 1250000 }
    ]
  }
]

function loadInvoices(): Invoice[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Invoice[]
  } catch {
    // ignore parse error
  }
  return initialInvoices
}

function saveInvoices(data: Invoice[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const invoices: Invoice[] = loadInvoices()

export function persistInvoices(): void {
  saveInvoices(invoices)
}