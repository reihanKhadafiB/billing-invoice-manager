type Props = {
  page: number
  total: number
  limit: number
  onPageChange: (newPage: number) => void
  onNextPageHover?: () => void
}

export default function InvoicePagination({ page, total, limit, onPageChange, onNextPageHover }: Props) {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex gap-2 mt-4">

      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50">
        Prev
      </button>

      <span className="px-3 py-1 text-gray-700 dark:text-gray-300">
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        onMouseEnter={onNextPageHover}
        className="px-3 py-1 rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50">
        Next
      </button>

    </div>
  )
}