/**
 * Financial Analytics Page
 * Comprehensive financial metrics with modern responsive design
 */

import { useQuery } from "@tanstack/react-query";
import { fetchFinancialStats, statsKeys } from "@/services/api/statsApi";
import { MetricCard } from "@/components/stats/MetricCard";
import { TrendChart } from "@/components/stats/TrendChart";
import { StatsTable } from "@/components/stats/StatsTable";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsFinance() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: statsKeys.finance(),
    queryFn: fetchFinancialStats,
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000,
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
        title="Financial Stats - DhanDiary Admin"
        description="Financial analytics and insights for DhanDiary"
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
                  Financial Analytics
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Comprehensive financial metrics and trends
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
                Failed to load financial stats:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
              </AlertDescription>
            </Alert>
          )}

          {/* Overall Financial Summary */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Overall Summary
                </CardTitle>
                <CardDescription>
                  Total income, expense, and net balance
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
                        title="Total Income"
                        value={stats ? formatCurrency(stats.totalIncome) : "₹0"}
                        icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                        subtitle="All-time earnings"
                        loading={false}
                      />
                      <MetricCard
                        title="Total Expense"
                        value={
                          stats ? formatCurrency(stats.totalExpense) : "₹0"
                        }
                        icon={<TrendingDown className="h-4 w-4 text-red-600" />}
                        subtitle="All-time spending"
                        loading={false}
                      />
                      <MetricCard
                        title="Net Balance"
                        value={stats ? formatCurrency(stats.netBalance) : "₹0"}
                        icon={<DollarSign className="h-4 w-4" />}
                        trend={
                          stats && stats.totalIncome > 0
                            ? {
                                value:
                                  (stats.netBalance / stats.totalIncome) * 100,
                                isPositive: stats.netBalance > 0,
                              }
                            : undefined
                        }
                        subtitle="Profit margin"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* This Month */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ArrowUpDown className="h-5 w-5 text-primary" />
                  This Month
                </CardTitle>
                <CardDescription>
                  Current month income and expenses
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
                        title="Income This Month"
                        value={
                          stats ? formatCurrency(stats.incomeThisMonth) : "₹0"
                        }
                        icon={<TrendingUp className="h-4 w-4 text-green-500" />}
                        loading={false}
                      />
                      <MetricCard
                        title="Expense This Month"
                        value={
                          stats ? formatCurrency(stats.expenseThisMonth) : "₹0"
                        }
                        icon={<TrendingDown className="h-4 w-4 text-red-500" />}
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Transaction Averages */}
          <section className="mb-6 sm:mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ArrowUpDown className="h-5 w-5 text-primary" />
                  Averages
                </CardTitle>
                <CardDescription>Average transaction values</CardDescription>
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
                        title="Avg Transaction"
                        value={
                          stats
                            ? formatCurrency(stats.averageTransactionValue)
                            : "₹0"
                        }
                        icon={<ArrowUpDown className="h-4 w-4" />}
                        subtitle="Overall average"
                        loading={false}
                      />
                      <MetricCard
                        title="Avg Income"
                        value={
                          stats
                            ? formatCurrency(stats.averageIncomeValue)
                            : "₹0"
                        }
                        icon={<TrendingUp className="h-4 w-4" />}
                        subtitle="Per income transaction"
                        loading={false}
                      />
                      <MetricCard
                        title="Avg Expense"
                        value={
                          stats
                            ? formatCurrency(stats.averageExpenseValue)
                            : "₹0"
                        }
                        icon={<TrendingDown className="h-4 w-4" />}
                        subtitle="Per expense transaction"
                        loading={false}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Highest Transaction */}
          {stats?.highestTransaction && (
            <section className="mb-6 sm:mb-8">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Highest Transaction
                  </CardTitle>
                  <CardDescription>
                    Largest single transaction recorded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <DollarSign className="h-4 w-4" />
                    <AlertTitle className="text-xl font-bold">
                      {formatCurrency(stats.highestTransaction.amount)}
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="inline-flex items-center gap-1">
                          <strong>Type:</strong> {stats.highestTransaction.type}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="inline-flex items-center gap-1">
                          <strong>Date:</strong>{" "}
                          {format(
                            new Date(stats.highestTransaction.date),
                            "PPP",
                          )}
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Monthly Trend Chart */}
          {stats?.monthlyTrend && stats.monthlyTrend.length > 0 && (
            <section className="mb-6 sm:mb-8">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ArrowUpDown className="h-5 w-5 text-primary" />
                    Monthly Financial Trend
                  </CardTitle>
                  <CardDescription>
                    Last 12 months income, expense, and net balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    title=""
                    data={
                      [...stats.monthlyTrend].reverse() as unknown as Record<
                        string,
                        unknown
                      >[]
                    }
                    type="area"
                    xAxisKey="monthLabel"
                    dataKeys={[
                      { key: "income", label: "Income", color: "#22c55e" },
                      { key: "expense", label: "Expense", color: "#ef4444" },
                      { key: "net", label: "Net", color: "#3b82f6" },
                    ]}
                    height={350}
                    loading={isLoading}
                  />
                </CardContent>
              </Card>
            </section>
          )}

          {/* Currency Breakdown */}
          {stats?.currencyBreakdown && stats.currencyBreakdown.length > 0 && (
            <section className="mb-6 sm:mb-8">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Currency Breakdown
                  </CardTitle>
                  <CardDescription>
                    Financial metrics by currency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StatsTable
                    title=""
                    columns={[
                      { key: "currency", label: "Currency", align: "left" },
                      {
                        key: "totalIncome",
                        label: "Total Income",
                        align: "right",
                        format: (value: unknown) =>
                          formatCurrency(value as number),
                      },
                      {
                        key: "totalExpense",
                        label: "Total Expense",
                        align: "right",
                        format: (value: unknown) =>
                          formatCurrency(value as number),
                      },
                      {
                        key: "netBalance",
                        label: "Net Balance",
                        align: "right",
                        format: (value: unknown) =>
                          formatCurrency(value as number),
                      },
                      {
                        key: "transactionCount",
                        label: "Transactions",
                        align: "right",
                        format: (value: unknown) =>
                          formatNumber(value as number),
                      },
                    ]}
                    data={
                      stats.currencyBreakdown as unknown as Record<
                        string,
                        unknown
                      >[]
                    }
                    loading={isLoading}
                  />
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
