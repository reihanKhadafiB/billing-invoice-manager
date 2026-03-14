import type { Invoice } from "../../invoices/types/invoice" 

export type StatusDistribution = {
  paid: number
  unpaid: number
  overdue: number
}

export type DashboardSummary = {
  totalRevenue: number
  totalUnpaid: number
  totalOverdue: number
  totalInvoiceThisMonth: number
  statusDistribution: StatusDistribution
  latestInvoices: Invoice[]
}