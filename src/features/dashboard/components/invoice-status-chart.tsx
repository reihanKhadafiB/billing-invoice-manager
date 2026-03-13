import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { StatusDistribution } from "../types/dashboard-summary"

type ChartData = {
  name: string
  value: number
}

type Props = {
  distribution: StatusDistribution
}

const COLORS: string[] = ["#22c55e", "#facc15", "#ef4444"]

export default function InvoiceStatusChart({ distribution }: Props) {

  const data: ChartData[] = [
    { name: "Paid",    value: distribution.paid },
    { name: "Unpaid",  value: distribution.unpaid },
    { name: "Overdue", value: distribution.overdue },
  ]

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}