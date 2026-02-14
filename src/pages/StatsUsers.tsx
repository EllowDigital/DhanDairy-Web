/**
 * User Analytics Page
 * Detailed user metrics and insights
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUserStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import { Users, UserPlus, UserCheck, UserX, Activity } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";

export default function StatsUsers() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: statsKeys.users(),
    queryFn: fetchUserStats,
    refetchInterval: 60000,
  });

  return (
    <>
      <SEOHead
        title="User Stats - DhanDiary Admin"
        description="Detailed user analytics for DhanDiary"
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
          <h1 className="text-3xl font-bold">User Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive insights into user behavior and growth
          </p>
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

        {/* Total Users */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">User Base</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Total Users"
              value={stats?.totalUsers.toLocaleString() ?? "-"}
              icon={<Users className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Active Users (7 days)"
              value={stats?.activeUsers7d.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              subtitle={
                stats
                  ? `${((stats.activeUsers7d / stats.totalUsers) * 100).toFixed(1)}% of total`
                  : undefined
              }
              loading={isLoading}
            />
            <MetricCard
              title="Active Users (30 days)"
              value={stats?.activeUsers30d.toLocaleString() ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              subtitle={
                stats
                  ? `${((stats.activeUsers30d / stats.totalUsers) * 100).toFixed(1)}% of total`
                  : undefined
              }
              loading={isLoading}
            />
          </div>
        </section>

        {/* User Growth */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">User Growth</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="New Users Today"
              value={stats?.newUsersToday.toLocaleString() ?? "-"}
              icon={<UserPlus className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="New Users This Month"
              value={stats?.newUsersThisMonth.toLocaleString() ?? "-"}
              icon={<UserPlus className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="User Growth Rate"
              value={stats ? `${stats.userGrowthRate.toFixed(2)}%` : "-"}
              icon={<Activity className="h-4 w-4" />}
              trend={{
                value: stats?.userGrowthRate ?? 0,
                isPositive: true,
              }}
              subtitle="Monthly growth"
              loading={isLoading}
            />
            <MetricCard
              title="Churned Users"
              value={stats?.churnedUsers.toLocaleString() ?? "-"}
              icon={<UserX className="h-4 w-4" />}
              subtitle="No activity in 60+ days"
              loading={isLoading}
            />
          </div>
        </section>

        {/* User Engagement */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">User Engagement</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Users with Transactions"
              value={stats?.usersWithTransactions.toLocaleString() ?? "-"}
              icon={<UserCheck className="h-4 w-4" />}
              subtitle={
                stats
                  ? `${stats.usersWithTransactionsPercent.toFixed(1)}% of total`
                  : undefined
              }
              loading={isLoading}
            />
            <MetricCard
              title="Avg Transactions per User"
              value={stats?.avgTransactionsPerUser.toFixed(2) ?? "-"}
              icon={<Activity className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Inactive Users"
              value={
                stats
                  ? (
                      stats.totalUsers - stats.usersWithTransactions
                    ).toLocaleString()
                  : "-"
              }
              icon={<UserX className="h-4 w-4" />}
              subtitle="Users with no transactions"
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
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Engagement Rate:</strong>{" "}
                    {stats.usersWithTransactionsPercent.toFixed(1)}% of users
                    have at least one transaction
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Retention:</strong>{" "}
                    {((stats.activeUsers30d / stats.totalUsers) * 100).toFixed(
                      1,
                    )}
                    % of users were active in the last 30 days
                  </AlertDescription>
                </Alert>
                {stats.churnedUsers > 0 && (
                  <Alert variant="destructive">
                    <UserX className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Churn Risk:</strong> {stats.churnedUsers} users
                      haven't been active in over 60 days
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
