import { invoices } from "../../../mocks/data/invoices"
import type { DashboardSummary } from "../types/dashboard-summary"

export async function getDashboardSummary(): Promise<DashboardSummary> {

    await new Promise((r) => setTimeout(r, 500))

    const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((acc, i) => acc + i.amount, 0)

    const totalUnpaid = invoices
    .filter((i) => i.status === "unpaid")
    .reduce((acc, i) => acc + i.amount, 0)

    const totalOverdue = invoices
    .filter((i) => i.status === "overdue")
    .reduce((acc, i) => acc + i.amount, 0)

    const now = new Date()

    const totalInvoiceThisMonth = invoices.filter((i) => {
    const date = new Date(i.due_date)
    return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    )
    }).length

    const statusDistribution = {
        paid: invoices.filter((i) => i.status === "paid").length,
        unpaid: invoices.filter((i) => i.status === "unpaid").length,
        overdue: invoices.filter((i) => i.status === "overdue").length,
    }
    
    return {
        totalRevenue,
        totalUnpaid,
        totalOverdue,
        totalInvoiceThisMonth,
        statusDistribution,
        invoices
    }
}