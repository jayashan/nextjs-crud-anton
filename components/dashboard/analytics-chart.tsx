"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan 1",
    visitors: 1200,
    pageviews: 3200,
  },
  {
    date: "Jan 8",
    visitors: 1800,
    pageviews: 4800,
  },
  {
    date: "Jan 15",
    visitors: 2200,
    pageviews: 5600,
  },
  {
    date: "Jan 22",
    visitors: 1600,
    pageviews: 4200,
  },
  {
    date: "Jan 29",
    visitors: 2400,
    pageviews: 6100,
  },
  {
    date: "Feb 5",
    visitors: 2800,
    pageviews: 7200,
  },
  {
    date: "Feb 12",
    visitors: 3200,
    pageviews: 8400,
  },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="pageviews" stroke="#adfa1d" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="visitors" stroke="#0ea5e9" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

