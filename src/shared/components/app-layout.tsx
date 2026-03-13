import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import Sidebar from "./sidebar"
import ThemeToggle from "./theme-toggle"
import { useUIStore } from "../../store/ui-store" 

export default function AppLayout() {
  const theme = useUIStore((state) => state.theme)
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* header */}
        <header className="h-14 border-b dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-6">
          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Billing & Invoice Manager
          </h1>
          <ThemeToggle />
        </header>

        {/* page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>
      <Toaster
        position="top-right"
        theme={theme}
        richColors/>
    </div>
  )
}