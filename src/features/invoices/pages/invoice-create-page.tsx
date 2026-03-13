import { useForm, useFieldArray, useWatch, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateInvoice } from "../hooks/useCreateInvoice"
import { customers } from "../../../mocks/data/customers"
import { formatRupiah } from "../../../shared/utils/format-currency"
import { createInvoiceSchema, type CreateInvoiceFormData, type CreateInvoiceInput } from "../types/invoice-form"

export default function InvoiceCreatePage() {
  const mutation = useCreateInvoice()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    } = useForm<CreateInvoiceInput, unknown, CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
        customer_id: "",
        due_date: "",
        status: "draft",
        items: [{ name: "", qty: 1, unit: "days", price: 0 }],
    },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  // hitung total realtime
    const watchedItems = useWatch({
      control,
      name: "items",
      defaultValue: [{ name: "", qty: 1, unit: "days", price: 0 }]
      })
    const total = watchedItems.reduce(
      (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
      0
    )

    const onSubmit: SubmitHandler<CreateInvoiceFormData> = (data) => {
        mutation.mutate(data)
    }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Buat Invoice Baru</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* customer */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer</label>
          <select
            {...register("customer_id")}
            className="w-full border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <option value="">-- Pilih Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.customer_id && (
            <p className="text-xs text-red-500">{errors.customer_id.message}</p>
          )}
        </div>

        {/* due date */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
          <input
            type="date"
            {...register("due_date")}
            className="w-full border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"/>
          {errors.due_date && (
            <p className="text-xs text-red-500">{errors.due_date.message}</p>
          )}
        </div>

        {/* status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Awal</label>
          <select {...register("status")} className="w-full border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <option value="draft">Draft</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Item Layanan</label>
            <button
              type="button"
              onClick={() => append({ name: "", qty: 1, unit: "days", price: 0 })}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              + Tambah Item
            </button>
          </div>

          {errors.items?.root && (
            <p className="text-xs text-red-500">{errors.items.root.message}</p>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="border dark:border-gray-700 rounded-lg p-4 space-y-3 bg-white dark:bg-gray-800/50">

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Item #{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-xs text-red-500 hover:underline">
                    Hapus
                  </button>
                )}
              </div>

              {/* nama layanan */}
              <div className="space-y-1">
                <input
                  {...register(`items.${index}.name`)}
                  placeholder="Nama layanan (e.g. Compute 4vCPU)"
                  className="w-full border dark:border-gray-700 rounded p-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"/>
                {errors.items?.[index]?.name && (
                  <p className="text-xs text-red-500">
                    {errors.items[index].name.message}
                  </p>
                )}
              </div>

              {/* qty, unit, price */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400">Qty</label>
                  <input
                    type="number"
                    {...register(`items.${index}.qty`)}
                    className="w-full border dark:border-gray-700 rounded p-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min={1}/>
                  {errors.items?.[index]?.qty && (
                    <p className="text-xs text-red-500">
                      {errors.items[index].qty.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400">Unit</label>
                  <select
                    {...register(`items.${index}.unit`)}
                    className="w-full border dark:border-gray-700 rounded p-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <option value="days">Days</option>
                    <option value="month">Month</option>
                    <option value="gb">GB</option>
                    <option value="tb">TB</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400">Harga Satuan (Rp)</label>
                  <input
                    type="number"
                    {...register(`items.${index}.price`)}
                    className="w-full border dark:border-gray-700 rounded p-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min={0}/>
                  {errors.items?.[index]?.price && (
                    <p className="text-xs text-red-500">
                      {errors.items[index].price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* subtotal per item */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                Subtotal:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {formatRupiah(
                    (Number(watchedItems[index]?.qty) || 0) *
                    (Number(watchedItems[index]?.price) || 0)
                  )}
                </span>
              </p>

            </div>
          ))}
        </div>

        {/* total realtime */}
        <div className="border-t dark:border-gray-700 pt-4 flex justify-between font-semibold text-lg text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>

        {/* submit error */}
        {mutation.isError && (
          <p className="text-sm text-red-500 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
            Gagal membuat invoice:{" "}
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Terjadi kesalahan"}
          </p>
        )}

        {/* submit button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50">
          {mutation.isPending ? "Menyimpan..." : "Buat Invoice"}
        </button>

      </form>
    </div>
  )
}