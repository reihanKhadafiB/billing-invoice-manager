// src/App.tsx
import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { QueryProvider } from "./app/providers/query-provider"
import { useUIStore } from "./store/ui-store"
import { router } from "./app/router/router"

export default function App() {
  const theme = useUIStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}