/**
 * Enhanced User Analytics Page
 * Detailed user metrics with modern responsive design
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUserStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Activity,
  RefreshCw,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsUsers() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: statsKeys.users(),
    queryFn: fetchUserStats,
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
        title="User Stats - DhanDiary Admin"
        description="Detailed user analytics for DhanDiary"
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header with Back Button */}
          <div className="mb-6 sm:mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link to="/stats">← Back to Dashboard</Link>
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  User Analytics
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Comprehensive insights into user behavior and growth
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
                Failed to load user stats:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
              </AlertDescription>
            </Alert>
          )}

          {/* User Base Overview */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="h-5 w-5 text-primary" />
                  User Base Overview
                </CardTitle>
                <CardDescription>
                  Total users and activity metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
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
                        title="Total Users"
                        value={formatNumber(stats?.totalUsers ?? 0)}
                        icon={<Users className="h-4 w-4" />}
                        loading={false}
                      />
                      <MetricCard
                        title="Active (7d)"
                        value={formatNumber(stats?.activeUsers7d ?? 0)}
                        icon={<Activity className="h-4 w-4" />}
                        subtitle={
                          stats
                            ? `${((stats.activeUsers7d / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}% of total`
                            : undefined
                        }
                        loading={false}
                      />
                      <MetricCard
                        title="Active (30d)"
                        value={formatNumber(stats?.activeUsers30d ?? 0)}
                        icon={<Activity className="h-4 w-4" />}
                        subtitle={
                          stats
                            ? `${((stats.activeUsers30d / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}% of total`
                            : undefined
                        }
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* User Growth */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  User Growth
                </CardTitle>
                <CardDescription>
                  New user acquisition and growth trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(4)].map((_, i) => (
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
                        title="New Today"
                        value={stats?.newUsersToday.toLocaleString() ?? "0"}
                        icon={<UserPlus className="h-4 w-4" />}
                        loading={false}
                      />
                      <MetricCard
                        title="New This Month"
                        value={formatNumber(stats?.newUsersThisMonth ?? 0)}
                        icon={<UserPlus className="h-4 w-4" />}
                        loading={false}
                      />
                      <MetricCard
                        title="Growth Rate"
                        value={
                          stats ? `${stats.userGrowthRate.toFixed(2)}%` : "0%"
                        }
                        icon={<TrendingUp className="h-4 w-4" />}
                        trend={{
                          value: stats?.userGrowthRate ?? 0,
                          isPositive: (stats?.userGrowthRate ?? 0) >= 0,
                        }}
                        subtitle="Monthly growth"
                        loading={false}
                      />
                      <MetricCard
                        title="Churned Users"
                        value={formatNumber(stats?.churnedUsers ?? 0)}
                        icon={<UserX className="h-4 w-4 text-destructive" />}
                        subtitle="60+ days inactive"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* User Engagement */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <UserCheck className="h-5 w-5 text-primary" />
                  User Engagement
                </CardTitle>
                <CardDescription>
                  Transaction activity and user involvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
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
                        title="With Transactions"
                        value={formatNumber(stats?.usersWithTransactions ?? 0)}
                        icon={<UserCheck className="h-4 w-4 text-green-500" />}
                        subtitle={
                          stats
                            ? `${stats.usersWithTransactionsPercent.toFixed(1)}% of total`
                            : undefined
                        }
                        loading={false}
                      />
                      <MetricCard
                        title="Avg Transactions"
                        value={stats?.avgTransactionsPerUser.toFixed(1) ?? "0"}
                        icon={<Activity className="h-4 w-4" />}
                        subtitle="Per user"
                        loading={false}
                      />
                      <MetricCard
                        title="Inactive Users"
                        value={
                          stats
                            ? formatNumber(
                                stats.totalUsers - stats.usersWithTransactions,
                              )
                            : "0"
                        }
                        icon={<UserX className="h-4 w-4" />}
                        subtitle="No transactions"
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
                <CardDescription>
                  Important metrics and observations
                </CardDescription>
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
                        <UserCheck className="h-4 w-4" />
                        <AlertTitle>Engagement Rate</AlertTitle>
                        <AlertDescription>
                          <span className="text-lg font-semibold">
                            {stats.usersWithTransactionsPercent.toFixed(1)}%
                          </span>{" "}
                          of users have at least one transaction (
                          {formatNumber(stats.usersWithTransactions)} users)
                        </AlertDescription>
                      </Alert>

                      <Alert>
                        <Activity className="h-4 w-4" />
                        <AlertTitle>30-Day Retention</AlertTitle>
                        <AlertDescription>
                          <span className="text-lg font-semibold">
                            {(
                              (stats.activeUsers30d /
                                Math.max(stats.totalUsers, 1)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>{" "}
                          of users were active in the last 30 days (
                          {formatNumber(stats.activeUsers30d)} users)
                        </AlertDescription>
                      </Alert>

                      {stats.churnedUsers > 0 && (
                        <Alert variant="destructive">
                          <UserX className="h-4 w-4" />
                          <AlertTitle>Churn Risk</AlertTitle>
                          <AlertDescription>
                            <span className="text-lg font-semibold">
                              {formatNumber(stats.churnedUsers)}
                            </span>{" "}
                            users haven't been active in over 60 days. Consider
                            running a re-engagement campaign.
                          </AlertDescription>
                        </Alert>
                      )}

                      {stats.userGrowthRate > 0 && (
                        <Alert>
                          <TrendingUp className="h-4 w-4" />
                          <AlertTitle>Growth Trend</AlertTitle>
                          <AlertDescription>
                            User base is growing at{" "}
                            <span className="text-lg font-semibold">
                              {stats.userGrowthRate.toFixed(2)}%
                            </span>{" "}
                            per month with{" "}
                            {formatNumber(stats.newUsersThisMonth)} new users
                            this month.
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
