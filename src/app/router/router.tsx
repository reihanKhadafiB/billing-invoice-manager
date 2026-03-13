import { createBrowserRouter } from "react-router-dom"

import DashboardPage from "../../features/dashboard/pages/dashboard-page"
import InvoiceListPage from "../../features/invoices/pages/invoice-list-page"
import InvoiceDetailPage from "../../features/invoices/pages/invoice-detail-page"
import InvoiceCreatePage from "../../features/invoices/pages/invoice-create-page"
import AppLayout from "../../shared/components/app-layout"
import CustomerProfilePage from "../../features/customers/pages/customer-profile-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "invoices", element: <InvoiceListPage /> },
      { path: "invoices/create", element: <InvoiceCreatePage /> },
      { path: "invoices/:id", element: <InvoiceDetailPage /> },
      { path: "customers/:id", element: <CustomerProfilePage /> }
    ],
  },
])