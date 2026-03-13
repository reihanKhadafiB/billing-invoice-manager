import { create } from "zustand"
import { persist } from "zustand/middleware"

type UIState = {
  // tema
  theme: "light" | "dark"
  toggleTheme: () => void

  // sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (value: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // tema
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      // sidebar
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),
      setSidebarCollapsed: (value) =>
        set({ sidebarCollapsed: value }),
    }),
    {
      name: "billing-ui-state",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)