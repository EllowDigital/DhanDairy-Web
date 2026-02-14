/**
 * System Health Monitoring Page
 * Database health and system metrics
 */

import { useQuery } from "@tanstack/react-query";
import { fetchSystemHealthStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import { StatsTable } from "@/components/stats/StatsTable";
import {
  Database,
  Clock,
  AlertTriangle,
  Activity,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { formatDistanceToNow } from "date-fns";

export default function StatsHealth() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: statsKeys.health(),
    queryFn: fetchSystemHealthStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const tableData = stats
    ? [
        { table: "Users", count: stats.tableRowCounts.users },
        { table: "Transactions", count: stats.tableRowCounts.transactions },
        {
          table: "Daily Summaries",
          count: stats.tableRowCounts.dailySummaries,
        },
        {
          table: "Monthly Summaries",
          count: stats.tableRowCounts.monthlySummaries,
        },
      ]
    : [];

  return (
    <>
      <SEOHead
        title="System Health - DhanDiary Admin"
        description="System health monitoring for DhanDiary"
        index={false}
      />

      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/stats">← Back to Dashboard</Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold">System Health</h1>
          <p className="mt-2 text-muted-foreground">
            Database health and system monitoring
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load system health:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}

        {/* Overall Health Status */}
        <section className="mb-8">
          {stats &&
            !stats.triggersHealth.inconsistentData &&
            stats.usersWithSyncIssues === 0 && (
              <Alert className="border-green-600">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>System Healthy</AlertTitle>
                <AlertDescription>
                  All systems operational. No issues detected.
                </AlertDescription>
              </Alert>
            )}

          {stats &&
            (stats.triggersHealth.inconsistentData ||
              stats.usersWithSyncIssues > 0) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Issues Detected</AlertTitle>
                <AlertDescription>
                  {stats.triggersHealth.inconsistentData && (
                    <div>• Missing summaries detected</div>
                  )}
                  {stats.usersWithSyncIssues > 0 && (
                    <div>
                      • Users with sync issues: {stats.usersWithSyncIssues}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
        </section>

        {/* Activity Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Last Transaction"
              value={
                stats?.lastTransactionTime
                  ? formatDistanceToNow(new Date(stats.lastTransactionTime), {
                      addSuffix: true,
                    })
                  : "No transactions yet"
              }
              icon={<Clock className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Users with Sync Issues"
              value={stats?.usersWithSyncIssues.toLocaleString() ?? "-"}
              icon={<AlertTriangle className="h-4 w-4" />}
              loading={isLoading}
            />
          </div>
        </section>

        {/* Database Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Database Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Estimated DB Size"
              value={stats?.databaseSize.estimated ?? "-"}
              icon={<HardDrive className="h-4 w-4" />}
              subtitle="Rough estimate"
              loading={isLoading}
            />
            <MetricCard
              title="Total Rows"
              value={
                stats
                  ? Object.values(stats.tableRowCounts)
                      .reduce((sum, count) => sum + count, 0)
                      .toLocaleString()
                  : "-"
              }
              icon={<Database className="h-4 w-4" />}
              subtitle="Across all tables"
              loading={isLoading}
            />
          </div>
        </section>

        {/* Table Row Counts */}
        <section className="mb-8">
          <StatsTable
            title="Table Row Counts"
            columns={[
              { key: "table", label: "Table Name", align: "left" },
              {
                key: "count",
                label: "Row Count",
                align: "right",
                format: (value: number) => value.toLocaleString(),
              },
            ]}
            data={tableData}
            loading={isLoading}
          />
        </section>

        {/* Trigger Health */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Trigger Health</h2>
          <div className="space-y-4">
            {stats && (
              <>
                <Alert
                  variant={
                    stats.triggersHealth.missingSummaries > 0
                      ? "destructive"
                      : "default"
                  }
                >
                  <Activity className="h-4 w-4" />
                  <AlertTitle>Missing Summaries</AlertTitle>
                  <AlertDescription>
                    {stats.triggersHealth.missingSummaries > 0 ? (
                      <>
                        {stats.triggersHealth.missingSummaries} day(s) in the
                        last 30 days are missing daily summaries. This may
                        indicate trigger issues.
                      </>
                    ) : (
                      <>
                        All daily summaries are present. Triggers working
                        correctly.
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertTitle>Data Consistency</AlertTitle>
                  <AlertDescription>
                    {stats.triggersHealth.inconsistentData ? (
                      <>
                        <span className="text-destructive font-semibold">
                          Warning:
                        </span>{" "}
                        Inconsistencies detected in summary data. Consider
                        running a backfill operation.
                      </>
                    ) : (
                      <>All data appears consistent. No action required.</>
                    )}
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
