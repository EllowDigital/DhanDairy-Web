/**
 * Financial Analytics Page
 * Comprehensive financial metrics and trends
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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/shared/SEOHead";
import { format } from "date-fns";

export default function StatsFinance() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: statsKeys.finance(),
    queryFn: fetchFinancialStats,
    refetchInterval: 120000, // Refetch every 2 minutes
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
        title="Financial Stats - DhanDiary Admin"
        description="Financial analytics and insights for DhanDiary"
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
          <h1 className="text-3xl font-bold">Financial Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive financial metrics and trends
          </p>
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
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Overall Summary</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Income"
              value={stats ? formatCurrency(stats.totalIncome) : "-"}
              icon={<TrendingUp className="h-4 w-4 text-green-600" />}
              loading={isLoading}
            />
            <MetricCard
              title="Total Expense"
              value={stats ? formatCurrency(stats.totalExpense) : "-"}
              icon={<TrendingDown className="h-4 w-4 text-red-600" />}
              loading={isLoading}
            />
            <MetricCard
              title="Net Balance"
              value={stats ? formatCurrency(stats.netBalance) : "-"}
              icon={<DollarSign className="h-4 w-4" />}
              trend={
                stats
                  ? {
                      value:
                        (stats.netBalance / Math.max(stats.totalIncome, 1)) *
                        100,
                      isPositive: stats.netBalance > 0,
                    }
                  : undefined
              }
              subtitle="Profit margin"
              loading={isLoading}
            />
          </div>
        </section>

        {/* This Month */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">This Month</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Income This Month"
              value={stats ? formatCurrency(stats.incomeThisMonth) : "-"}
              icon={<TrendingUp className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Expense This Month"
              value={stats ? formatCurrency(stats.expenseThisMonth) : "-"}
              icon={<TrendingDown className="h-4 w-4" />}
              loading={isLoading}
            />
          </div>
        </section>

        {/* Transaction Averages */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Averages</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Avg Transaction Value"
              value={
                stats ? formatCurrency(stats.averageTransactionValue) : "-"
              }
              icon={<ArrowUpDown className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Avg Income Transaction"
              value={stats ? formatCurrency(stats.averageIncomeValue) : "-"}
              icon={<TrendingUp className="h-4 w-4" />}
              loading={isLoading}
            />
            <MetricCard
              title="Avg Expense Transaction"
              value={stats ? formatCurrency(stats.averageExpenseValue) : "-"}
              icon={<TrendingDown className="h-4 w-4" />}
              loading={isLoading}
            />
          </div>
        </section>

        {/* Highest Transaction */}
        {stats?.highestTransaction && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Highest Transaction</h2>
            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="font-semibold">
                    {formatCurrency(stats.highestTransaction.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Type: {stats.highestTransaction.type} • Date:{" "}
                    {format(new Date(stats.highestTransaction.date), "PPP")}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </section>
        )}

        {/* Monthly Trend Chart */}
        {stats?.monthlyTrend && stats.monthlyTrend.length > 0 && (
          <section className="mb-8">
            <TrendChart
              title="Monthly Financial Trend (Last 12 Months)"
              data={stats.monthlyTrend.reverse()}
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
          </section>
        )}

        {/* Currency Breakdown */}
        {stats?.currencyBreakdown && stats.currencyBreakdown.length > 0 && (
          <section>
            <StatsTable
              title="Currency Breakdown"
              columns={[
                { key: "currency", label: "Currency", align: "left" },
                {
                  key: "totalIncome",
                  label: "Total Income",
                  align: "right",
                  format: formatCurrency,
                },
                {
                  key: "totalExpense",
                  label: "Total Expense",
                  align: "right",
                  format: formatCurrency,
                },
                {
                  key: "netBalance",
                  label: "Net Balance",
                  align: "right",
                  format: formatCurrency,
                },
                {
                  key: "transactionCount",
                  label: "Transactions",
                  align: "right",
                  format: (value: number) => value.toLocaleString(),
                },
              ]}
              data={stats.currencyBreakdown}
              loading={isLoading}
            />
          </section>
        )}
      </div>
    </>
  );
}
