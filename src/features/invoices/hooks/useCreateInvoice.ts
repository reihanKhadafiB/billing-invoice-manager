import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { createInvoice } from "../api/createInvoice"
import type { CreateInvoiceFormData } from "../types/invoice-form"

export function useCreateInvoice() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateInvoiceFormData) => createInvoice(data),

    onSuccess: (newInvoice) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
      toast.success("Invoice berhasil dibuat!", {
        description: `${newInvoice.id} telah ditambahkan`
      })
      navigate(`/invoices/${newInvoice.id}`)
    },

    onError: (error) => {
      toast.error("Gagal membuat invoice", {
        description: error instanceof Error ? error.message : "Terjadi kesalahan"
      })
    }
  })
}