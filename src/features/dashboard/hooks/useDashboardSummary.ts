import { useQuery } from "@tanstack/react-query"
import { getDashboardSummary } from "../api/getDashboardSummary"
import type { DashboardSummary } from "../types/dashboard-summary"

export function useDashboardSummary() {

  return useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    refetchInterval: 60000
  })
}