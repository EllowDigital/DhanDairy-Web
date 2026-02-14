/**
 * Transaction Analytics Page
 * Detailed transaction metrics with modern responsive design
 */

import { useQuery } from "@tanstack/react-query";
import { fetchTransactionStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Trash2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsTransactions() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: statsKeys.transactions(),
    queryFn: fetchTransactionStats,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <>
      <SEOHead
        title="Transaction Stats - DhanDiary Admin"
        description="Detailed transaction analytics for DhanDiary"
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
                  Transaction Analytics
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Comprehensive insights into transaction activity and trends
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                {isRefetching ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load transaction stats:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}

          {/* Transaction Volume */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Transaction Volume
                </CardTitle>
                <CardDescription>Total transactions and growth metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-3 p-4 border rounded-lg">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Total Transactions"
                        value={formatNumber(stats?.totalTransactions ?? 0)}
                        icon={<Activity className="h-4 w-4" />}
                        trend={{
                          value: stats?.transactionGrowthRate ?? 0,
                          isPositive: (stats?.transactionGrowthRate ?? 0) >= 0,
                        }}
                        subtitle="Growth rate"
                        loading={false}
                      />
                      <MetricCard
                        title="Today"
                        value={stats?.transactionsToday.toLocaleString() ?? "0"}
                        icon={<Activity className="h-4 w-4" />}
                        loading={false}
                      />
                      <MetricCard
                        title="This Month"
                        value={formatNumber(stats?.transactionsThisMonth ?? 0)}
                        icon={<Activity className="h-4 w-4" />}
                        loading={false}
                      />
                      <MetricCard
                        title="Avg per User"
                        value={stats?.avgTransactionsPerUser.toFixed(2) ?? "0"}
                        icon={<Activity className="h-4 w-4" />}
                        subtitle="Per user average"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Transaction Types */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Transaction Types
                </CardTitle>
                <CardDescription>Income vs expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-3 p-4 border rounded-lg">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Income"
                        value={formatNumber(stats?.incomeTransactionCount ?? 0)}
                        icon={<TrendingUp className="h-4 w-4 text-green-500" />}
                        subtitle={
                          stats
                            ? `${((stats.incomeTransactionCount / Math.max(stats.totalTransactions, 1)) * 100).toFixed(1)}% of total`
                            : undefined
                        }
                        loading={false}
                      />
                      <MetricCard
                        title="Expense"
                        value={formatNumber(stats?.expenseTransactionCount ?? 0)}
                        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
                        subtitle={
                          stats
                            ? `${((stats.expenseTransactionCount / Math.max(stats.totalTransactions, 1)) * 100).toFixed(1)}% of total`
                            : undefined
                        }
                        loading={false}
                      />
                      <MetricCard
                        title="Deleted"
                        value={formatNumber(stats?.deletedTransactionCount ?? 0)}
                        icon={<Trash2 className="h-4 w-4" />}
                        subtitle="Soft deleted"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* System Metrics */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  System Metrics
                </CardTitle>
                <CardDescription>Sync status and ratios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="space-y-3 p-4 border rounded-lg">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Sync Backlog"
                        value={formatNumber(stats?.syncBacklogCount ?? 0)}
                        icon={<RefreshCw className={`h-4 w-4 ${(stats?.syncBacklogCount ?? 0) > 100 ? 'text-destructive' : ''}`} />}
                        subtitle="Pending sync"
                        loading={false}
                      />
                      <MetricCard
                        title="Income:Expense"
                        value={
                          stats && stats.expenseTransactionCount > 0
                            ? `${(stats.incomeTransactionCount / stats.expenseTransactionCount).toFixed(2)}:1`
                            : "N/A"
                        }
                        icon={<Activity className="h-4 w-4" />}
                        subtitle="Transaction ratio"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Insights */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Key Insights
                </CardTitle>
                <CardDescription>Important metrics and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </>
                  ) : stats ? (
                    <>
                      <Alert>
                        <Activity className="h-4 w-4" />
                        <AlertTitle>Transaction Mix</AlertTitle>
                        <AlertDescription>
                          Users create{" "}
                          {stats.incomeTransactionCount > stats.expenseTransactionCount
                            ? "more income"
                            : "more expense"}{" "}
                          transactions. The{" "}
                          {stats.incomeTransactionCount > stats.expenseTransactionCount
                            ? "income"
                            : "expense"}{" "}
                          type represents{" "}
                          <span className="text-lg font-semibold">
                            {
                              ((
                                Math.max(
                                  stats.incomeTransactionCount,
                                  stats.expenseTransactionCount,
                                ) / Math.max(stats.totalTransactions, 1)
                              ) * 100
                            ).toFixed(1)}%
                          </span>{" "}
                          of all transactions.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <TrendingUp className="h-4 w-4" />
                        <AlertTitle>Growth Trend</AlertTitle>
                        <AlertDescription>
                          Transaction volume is{" "}
                          {stats.transactionGrowthRate >= 0 ? "growing" : "declining"} at{" "}
                          <span className="text-lg font-semibold">
                            {Math.abs(stats.transactionGrowthRate).toFixed(1)}%
                          </span>{" "}
                          this month with {formatNumber(stats.transactionsThisMonth)} transactions recorded.
                        </AlertDescription>
                      </Alert>
                      
                      {stats.syncBacklogCount > 0 && (
                        <Alert variant={stats.syncBacklogCount > 100 ? "destructive" : "default"}>
                          <RefreshCw className="h-4 w-4" />
                          <AlertTitle>Sync Status</AlertTitle>
                          <AlertDescription>
                            There are{" "}
                            <span className="text-lg font-semibold">
                              {formatNumber(stats.syncBacklogCount)}
                            </span>{" "}
                            transactions pending sync
                            {stats.syncBacklogCount > 100 && " that need immediate attention"}.
                          </AlertDescription>
                        </Alert>
                      )}
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
