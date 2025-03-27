"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 2100,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 1800,
  },
  {
    name: "Jun",
    total: 2600,
  },
  {
    name: "Jul",
    total: 2200,
  },
  {
    name: "Aug",
    total: 2900,
  },
  {
    name: "Sep",
    total: 3100,
  },
  {
    name: "Oct",
    total: 3500,
  },
  {
    name: "Nov",
    total: 3200,
  },
  {
    name: "Dec",
    total: 3800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value: number) => [`$${value}`, "Revenue"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

