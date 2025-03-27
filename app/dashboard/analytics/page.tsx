import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { AnalyticsMetrics } from "@/components/dashboard/analytics-metrics"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and metrics for your account.</p>
      </div>

      <AnalyticsMetrics />

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Your performance metrics over time.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <AnalyticsChart />
        </CardContent>
      </Card>
    </div>
  )
}

