type Props = {
  title: string
  value: number | string
}

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="p-4 border dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h2>
    </div>
  )
}