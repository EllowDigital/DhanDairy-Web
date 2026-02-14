/**
 * Main Stats Dashboard Page
 * Overview of all key metrics
 */

import { useQuery } from "@tanstack/react-query";
import { fetchGlobalStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { formatDistanceToNow } from "date-fns";

export default function Stats() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: statsKeys.global(),
    queryFn: fetchGlobalStats,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <SEOHead
        title="Stats Dashboard - DhanDiary Admin"
        description="Admin dashboard for DhanDiary analytics and statistics"
        index={false}
      />

      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Stats Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Real-time analytics and insights for DhanDiary
          </p>
          {stats && (
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated:{" "}
              {formatDistanceToNow(new Date(stats.snapshot.generatedAt), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load stats:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/stats/users">Users</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/stats/transactions">Transactions</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/stats/finance">Finance</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/stats/health">System Health</Link>
          </Button>
        </div>

        {/* User Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">User Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Users"
              value={stats?.user.totalUsers.toLocaleString() ?? "-"}
              icon={<Users className="h-4 w-4" />}
              trend={{
                value: stats?.user.userGrowthRate ?? 0,
                isPositive: true,
              }}
              subtitle="Growth rate"
              loading={isLoading}
            />
            <MetricCard
              title="Active Users (30d)"
              value={stats?.user.activeUsers30d.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              subtitle={`${stats?.user.usersWithTransactionsPercent ?? 0}% with transactions`}
              loading={isLoading}
            />
            <MetricCard
              title="New Users Today"
              value={stats?.user.newUsersToday.toLocaleString() ?? "-"}
              icon={<ArrowUpRight className="h-4 w-4" />}
              subtitle={`${stats?.user.newUsersThisMonth ?? 0} this month`}
              loading={isLoading}
            />
            <MetricCard
              title="Churned Users"
              value={stats?.user.churnedUsers.toLocaleString() ?? "-"}
              icon={<AlertCircle className="h-4 w-4" />}
              subtitle="No activity in 60+ days"
              loading={isLoading}
            />
          </div>
        </section>

        {/* Transaction Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Transaction Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Transactions"
              value={
                stats?.transaction.totalTransactions.toLocaleString() ?? "-"
              }
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{
                value: stats?.transaction.transactionGrowthRate ?? 0,
                isPositive: true,
              }}
              subtitle="Growth rate"
              loading={isLoading}
            />
            <MetricCard
              title="Transactions Today"
              value={
                stats?.transaction.transactionsToday.toLocaleString() ?? "-"
              }
              subtitle={`${stats?.transaction.transactionsThisMonth ?? 0} this month`}
              loading={isLoading}
            />
            <MetricCard
              title="Avg per User"
              value={
                stats?.transaction.avgTransactionsPerUser.toFixed(1) ?? "-"
              }
              subtitle="Transactions per user"
              loading={isLoading}
            />
            <MetricCard
              title="Sync Backlog"
              value={
                stats?.transaction.syncBacklogCount.toLocaleString() ?? "-"
              }
              icon={<AlertCircle className="h-4 w-4" />}
              subtitle="Pending sync"
              loading={isLoading}
            />
          </div>
        </section>

        {/* Financial Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Financial Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Income"
              value={stats ? formatCurrency(stats.financial.totalIncome) : "-"}
              icon={<DollarSign className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Total Expense"
              value={stats ? formatCurrency(stats.financial.totalExpense) : "-"}
              icon={<DollarSign className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Net Balance"
              value={stats ? formatCurrency(stats.financial.netBalance) : "-"}
              icon={<DollarSign className="h-4 w-4" />}
              trend={
                stats
                  ? {
                      value:
                        (stats.financial.netBalance /
                          Math.max(stats.financial.totalIncome, 1)) *
                        100,
                      isPositive: stats.financial.netBalance > 0,
                    }
                  : undefined
              }
              loading={isLoading}
            />
          </div>
        </section>

        {/* System Health */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">System Health</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Last Transaction"
              value={
                stats?.health.lastTransactionTime
                  ? formatDistanceToNow(
                      new Date(stats.health.lastTransactionTime),
                      {
                        addSuffix: true,
                      },
                    )
                  : "N/A"
              }
              icon={<Activity className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Users with Sync Issues"
              value={stats?.health.usersWithSyncIssues.toLocaleString() ?? "-"}
              icon={<AlertCircle className="h-4 w-4" />}
              loading={isLoading}
            />
          </div>
        </section>
      </div>
    </>
  );
}
