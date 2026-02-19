/**
 * System Health Monitoring Page
 * Database health and system metrics with modern responsive design
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
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsHealth() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: statsKeys.health(),
    queryFn: fetchSystemHealthStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000,
  });

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

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
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link to="/stats">← Back to Dashboard</Link>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  System Health
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Database health and system monitoring
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
                className="w-full sm:w-auto"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`}
                />
                {isRefetching ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
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
          <section className="mb-6 sm:mb-8">
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : stats ? (
              <>
                {!stats.triggersHealth.inconsistentData &&
                  stats.usersWithSyncIssues === 0 && (
                    <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle>System Healthy</AlertTitle>
                      <AlertDescription>
                        All systems operational. No issues detected.
                      </AlertDescription>
                    </Alert>
                  )}

                {(stats.triggersHealth.inconsistentData ||
                  stats.usersWithSyncIssues > 0) && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Issues Detected</AlertTitle>
                    <AlertDescription>
                      <div className="space-y-1">
                        {stats.triggersHealth.inconsistentData && (
                          <div>• Missing summaries detected</div>
                        )}
                        {stats.usersWithSyncIssues > 0 && (
                          <div>
                            • Users with sync issues:{" "}
                            {stats.usersWithSyncIssues}
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : null}
          </section>

          {/* Activity Metrics */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest system activity and sync status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="space-y-3 p-4 border rounded-lg"
                        >
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Last Transaction"
                        value={
                          stats?.lastTransactionTime
                            ? formatDistanceToNow(
                                new Date(stats.lastTransactionTime),
                                {
                                  addSuffix: true,
                                },
                              )
                            : "No transactions yet"
                        }
                        icon={<Clock className="h-4 w-4" />}
                        subtitle="Most recent"
                        loading={false}
                      />
                      <MetricCard
                        title="Sync Issues"
                        value={formatNumber(stats?.usersWithSyncIssues ?? 0)}
                        icon={
                          <AlertTriangle
                            className={`h-4 w-4 ${(stats?.usersWithSyncIssues ?? 0) > 0 ? "text-destructive" : "text-green-500"}`}
                          />
                        }
                        subtitle="Users affected"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Database Metrics */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Database className="h-5 w-5 text-primary" />
                  Database Metrics
                </CardTitle>
                <CardDescription>Database size and row counts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="space-y-3 p-4 border rounded-lg"
                        >
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Estimated DB Size"
                        value={
                          stats?.databaseSize.estimated ?? "Calculating..."
                        }
                        icon={<HardDrive className="h-4 w-4" />}
                        subtitle="Rough estimate"
                        loading={false}
                      />
                      <MetricCard
                        title="Total Rows"
                        value={
                          stats
                            ? formatNumber(
                                (
                                  Object.values(
                                    stats.tableRowCounts,
                                  ) as number[]
                                ).reduce(
                                  (sum: number, count: number) => sum + count,
                                  0,
                                ),
                              )
                            : "0"
                        }
                        icon={<Database className="h-4 w-4" />}
                        subtitle="Across all tables"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Table Row Counts */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Database className="h-5 w-5 text-primary" />
                  Table Row Counts
                </CardTitle>
                <CardDescription>Detailed row counts per table</CardDescription>
              </CardHeader>
              <CardContent>
                <StatsTable
                  title=""
                  columns={[
                    { key: "table", label: "Table Name", align: "left" },
                    {
                      key: "count",
                      label: "Row Count",
                      align: "right",
                      format: (value: unknown) => formatNumber(value as number),
                    },
                  ]}
                  data={tableData}
                  loading={isLoading}
                />
              </CardContent>
            </Card>
          </section>

          {/* Trigger Health */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Trigger Health
                </CardTitle>
                <CardDescription>
                  Database trigger monitoring and data consistency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </>
                  ) : stats ? (
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
                              <span className="font-semibold">
                                {stats.triggersHealth.missingSummaries} day(s)
                              </span>{" "}
                              in the last 30 days are missing daily summaries.
                              This may indicate trigger issues.
                            </>
                          ) : (
                            <>
                              All daily summaries are present. Triggers working
                              correctly.
                            </>
                          )}
                        </AlertDescription>
                      </Alert>

                      <Alert
                        variant={
                          stats.triggersHealth.inconsistentData
                            ? "destructive"
                            : "default"
                        }
                      >
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
                            <>
                              All data appears consistent. No action required.
                            </>
                          )}
                        </AlertDescription>
                      </Alert>
                    </>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
