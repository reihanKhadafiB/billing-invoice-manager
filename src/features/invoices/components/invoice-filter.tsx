type Props = {
  value: string
  onChange: (status: string) => void
}

export default function InvoiceFilter({ value, onChange }: Props) {
  return (
    <select
      className="border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="paid">Paid</option>
      <option value="unpaid">Unpaid</option>
      <option value="overdue">Overdue</option>
      <option value="draft">Draft</option>
    </select>
  )
}