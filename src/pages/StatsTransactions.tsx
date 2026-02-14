/**
 * Transaction Analytics Page
 * Detailed transaction metrics and insights
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";

export default function StatsTransactions() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: statsKeys.transactions(),
    queryFn: fetchTransactionStats,
    refetchInterval: 60000,
  });

  return (
    <>
      <SEOHead
        title="Transaction Stats - DhanDiary Admin"
        description="Detailed transaction analytics for DhanDiary"
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
          <h1 className="text-3xl font-bold">Transaction Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive insights into transaction activity and trends
          </p>
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
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Transaction Volume</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Transactions"
              value={stats?.totalTransactions.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              trend={{
                value: stats?.transactionGrowthRate ?? 0,
                isPositive: (stats?.transactionGrowthRate ?? 0) >= 0,
              }}
              subtitle="Growth rate"
              loading={isLoading}
            />
            <MetricCard
              title="Transactions Today"
              value={stats?.transactionsToday.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Transactions This Month"
              value={stats?.transactionsThisMonth.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Avg per User"
              value={stats?.avgTransactionsPerUser.toFixed(2) ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              subtitle="Transactions per user"
              loading={isLoading}
            />
          </div>
        </section>

        {/* Transaction Types */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Transaction Types</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Income Transactions"
              value={stats?.incomeTransactionCount.toLocaleString() ?? "-"}
              icon={<TrendingUp className="h-4 w-4 text-green-500" />}
              subtitle={
                stats
                  ? `${((stats.incomeTransactionCount / stats.totalTransactions) * 100).toFixed(1)}% of total`
                  : undefined
              }
              loading={isLoading}
            />
            <MetricCard
              title="Expense Transactions"
              value={stats?.expenseTransactionCount.toLocaleString() ?? "-"}
              icon={<TrendingDown className="h-4 w-4 text-red-500" />}
              subtitle={
                stats
                  ? `${((stats.expenseTransactionCount / stats.totalTransactions) * 100).toFixed(1)}% of total`
                  : undefined
              }
              loading={isLoading}
            />
            <MetricCard
              title="Deleted Transactions"
              value={stats?.deletedTransactionCount.toLocaleString() ?? "-"}
              icon={<Trash2 className="h-4 w-4" />}
              loading={isLoading}
            />
          </div>
        </section>

        {/* System Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">System Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Sync Backlog"
              value={stats?.syncBacklogCount.toLocaleString() ?? "-"}
              icon={<RefreshCw className="h-4 w-4" />}
              subtitle="Transactions pending sync"
              loading={isLoading}
            />
            <MetricCard
              title="Income vs Expense Ratio"
              value={
                stats
                  ? `${(stats.incomeTransactionCount / stats.expenseTransactionCount).toFixed(2)}:1`
                  : "-"
              }
              icon={<Activity className="h-4 w-4" />}
              subtitle="Income to expense ratio"
              loading={isLoading}
            />
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Key Insights</h2>
          <div className="space-y-4">
            {stats && (
              <>
                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Transaction Mix:</strong> Your users create{" "}
                    {stats.incomeTransactionCount >
                    stats.expenseTransactionCount
                      ? "more income"
                      : "more expense"}{" "}
                    transactions (
                    {(
                      (Math.max(
                        stats.incomeTransactionCount,
                        stats.expenseTransactionCount,
                      ) /
                        stats.totalTransactions) *
                      100
                    ).toFixed(1)}
                    % of total)
                  </AlertDescription>
                </Alert>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Growth Trend:</strong> Transaction volume is{" "}
                    {stats.transactionGrowthRate >= 0 ? "growing" : "declining"}{" "}
                    by {Math.abs(stats.transactionGrowthRate).toFixed(1)}% this
                    month
                  </AlertDescription>
                </Alert>
                {stats.syncBacklogCount > 0 && (
                  <Alert variant="destructive">
                    <RefreshCw className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Sync Issues:</strong> There are{" "}
                      {stats.syncBacklogCount} transactions pending sync that
                      need attention
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
