import { Link, useLocation } from "react-router-dom"
import { useUIStore } from "../../store/ui-store"

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Invoices", path: "/invoices" },
  { label: "Buat Invoice", path: "/invoices/create" },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const location = useLocation()

  return (
    <aside
      className={`
        h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700
        transition-all duration-300 flex flex-col
        ${sidebarCollapsed ? "w-16" : "w-56"}
      `}>
      {/* Toggle button */}
      <div className="p-3 flex justify-end border-b dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          title={sidebarCollapsed ? "Expand" : "Collapse"}>
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                transition-colors duration-150
                ${isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }
              `}
              title={sidebarCollapsed ? item.label : undefined}>
              {/* Label — hilang kalau collapsed */}
              {sidebarCollapsed
                ? <span className="text-xs font-bold">{item.label[0]}</span>
                : <span>{item.label}</span>
              }
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}