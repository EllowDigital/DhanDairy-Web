/**
 * Main Stats Dashboard Page
 * Modern, responsive overview of all key metrics
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
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stats() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isRefetching,
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

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <>
      <SEOHead
        title="Stats Dashboard - DhanDiary Admin"
        description="Modern analytics dashboard for DhanDiary with real-time insights"
        index={false}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Modern Header with Glassmorphism */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Analytics Dashboard
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Real-time insights and performance metrics
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
            
            {stats && (
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Badge variant="secondary" className="font-normal">
                  Last updated: {formatDistanceToNow(new Date(stats.snapshot.generatedAt), { addSuffix: true })}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
              </div>
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

          {/* Quick Navigation Cards */}
          <div className="mb-6 sm:mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { to: "/stats/users", icon: Users, label: "Users", color: "blue" },
              { to: "/stats/transactions", icon: BarChart3, label: "Transactions", color: "green" },
              { to: "/stats/finance", icon: PieChart, label: "Finance", color: "purple" },
              { to: "/stats/health", icon: LineChart, label: "System", color: "orange" },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 h-full">
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center gap-2">
                    <div className={`p-2 sm:p-3 rounded-lg bg-${item.color}-500/10`}>
                      <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${item.color}-500`} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* User Metrics */}
          <section className="mb-6 sm:mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="h-5 w-5 text-primary" />
                  User Metrics
                </CardTitle>
                <CardDescription>User base growth and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-3">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MetricCard
                        title="Total Users"
                        value={stats?.user.totalUsers.toLocaleString() ?? "-"}
                        icon={<Users className="h-4 w-4" />}
                        trend={{
                          value: stats?.user.userGrowthRate ?? 0,
                          isPositive: true,
                        }}
                        subtitle="Growth rate"
                        loading={false}
                      />
                      <MetricCard
                        title="Active (30d)"
                        value={stats?.user.activeUsers30d.toLocaleString() ?? "-"}
                        subtitle={`${stats ? ((stats.user.activeUsers30d / stats.user.totalUsers) * 100).toFixed(1) : 0}% of total`}
                        loading={false}
                      />
                      <MetricCard
                        title="New Today"
                        value={stats?.user.newUsersToday.toLocaleString() ?? "-"}
                        subtitle="New registrations"
                        loading={false}
                      />
                      <MetricCard
                        title="Engaged Users"
                        value={`${stats?.user.usersWithTransactionsPercent.toFixed(1) ?? 0}%`}
                        subtitle={`${stats?.user.usersWithTransactions.toLocaleString() ?? 0} users`}
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
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
