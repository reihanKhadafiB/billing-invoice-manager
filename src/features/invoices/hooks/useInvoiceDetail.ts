import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getInvoiceById } from "../api/getInvoiceById"
import { updateInvoiceStatus } from "../api/updateInvoiceStatus"
import type { Invoice } from "../types/invoice"
import { toast } from "sonner"

export function useInvoiceDetail(id: string) {

  const queryClient = useQueryClient()

  // QUERY
  const query = useQuery<Invoice>({
    queryKey: ["invoices", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  })

  // MUTATION
  const mutation = useMutation({
    mutationFn: () =>
      updateInvoiceStatus({ id, status: "paid" }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["invoices", id] })
      const previousInvoice = queryClient.getQueryData<Invoice>(["invoices", id])
      queryClient.setQueryData<Invoice>(["invoices", id], (old) =>
        old ? { ...old, status: "paid" } : old
      )

      return { previousInvoice }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
      toast.success("Invoice berhasil ditandai lunas!")
    },

    onError: (_error, _variables, context) => {
      if (context?.previousInvoice) {
        queryClient.setQueryData(["invoices", id], context.previousInvoice)
      }
      toast.error("Gagal memperbarui status invoice")
    },
  })

  return { query, mutation }
}