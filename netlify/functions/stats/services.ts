/**
 * Database service layer for Stats API
 * Handles all database interactions with Neon PostgreSQL
 */

import { Pool, PoolClient } from "pg";
import {
  UserMetrics,
  TransactionMetrics,
  FinancialMetrics,
  TimeSeriesStats,
  SystemHealthMetrics,
  GlobalStats,
  MonthlyFinancialTrend,
  CurrencyBreakdown,
  DailyActivity,
  MonthlyGrowth,
} from "./types";
import {
  getUserMetricsQuery,
  getTransactionMetricsQuery,
  getFinancialMetricsQuery,
  getMonthlyTrendQuery,
  getCurrencyBreakdownQuery,
  getDailyActivityQuery,
  getMonthlyGrowthQuery,
  getPeakUsageDayQuery,
  getSystemHealthQuery,
} from "./queries";

// =====================================================
// DATABASE CONNECTION POOL
// =====================================================

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false, // Neon requires SSL
      },
      max: 10, // Maximum pool size
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected database pool error:", err);
    });
  }

  return pool;
}

async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const client: PoolClient = await getPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// =====================================================
// USER METRICS SERVICE
// =====================================================

export async function getUserMetrics(): Promise<UserMetrics> {
  const rows = await query(getUserMetricsQuery);

  if (rows.length === 0) {
    throw new Error("Failed to fetch user metrics");
  }

  const row = rows[0];

  return {
    totalUsers: parseInt(row.total_users) || 0,
    activeUsers7d: parseInt(row.active_users_7d) || 0,
    activeUsers30d: parseInt(row.active_users_30d) || 0,
    newUsersToday: parseInt(row.new_users_today) || 0,
    newUsersThisMonth: parseInt(row.new_users_this_month) || 0,
    userGrowthRate: parseFloat(row.user_growth_rate) || 0,
    usersWithTransactions: parseInt(row.users_with_transactions) || 0,
    usersWithTransactionsPercent:
      parseFloat(row.users_with_transactions_percent) || 0,
    churnedUsers: parseInt(row.churned_users) || 0,
    avgTransactionsPerUser: parseFloat(row.avg_transactions_per_user) || 0,
  };
}

// =====================================================
// TRANSACTION METRICS SERVICE
// =====================================================

export async function getTransactionMetrics(): Promise<TransactionMetrics> {
  const rows = await query(getTransactionMetricsQuery);

  if (rows.length === 0) {
    throw new Error("Failed to fetch transaction metrics");
  }

  const row = rows[0];

  return {
    totalTransactions: parseInt(row.total_transactions) || 0,
    transactionsToday: parseInt(row.transactions_today) || 0,
    transactionsThisMonth: parseInt(row.transactions_this_month) || 0,
    avgTransactionsPerUser: parseFloat(row.avg_transactions_per_user) || 0,
    incomeTransactionCount: parseInt(row.income_transaction_count) || 0,
    expenseTransactionCount: parseInt(row.expense_transaction_count) || 0,
    deletedTransactionCount: parseInt(row.deleted_transaction_count) || 0,
    syncBacklogCount: parseInt(row.sync_backlog_count) || 0,
    transactionGrowthRate: parseFloat(row.transaction_growth_rate) || 0,
  };
}

// =====================================================
// FINANCIAL METRICS SERVICE
// =====================================================

export async function getFinancialMetrics(): Promise<FinancialMetrics> {
  const [metricsRows, trendRows, currencyRows] = await Promise.all([
    query(getFinancialMetricsQuery),
    query(getMonthlyTrendQuery),
    query(getCurrencyBreakdownQuery),
  ]);

  if (metricsRows.length === 0) {
    throw new Error("Failed to fetch financial metrics");
  }

  const row = metricsRows[0];

  const monthlyTrend: MonthlyFinancialTrend[] = trendRows.map((r) => ({
    year: parseInt(r.year),
    month: parseInt(r.month),
    monthLabel: r.month_label,
    income: parseFloat(r.income) || 0,
    expense: parseFloat(r.expense) || 0,
    net: parseFloat(r.net) || 0,
    transactionCount: parseInt(r.transaction_count) || 0,
  }));

  const currencyBreakdown: CurrencyBreakdown[] = currencyRows.map((r) => ({
    currency: r.currency,
    totalIncome: parseFloat(r.total_income) || 0,
    totalExpense: parseFloat(r.total_expense) || 0,
    netBalance: parseFloat(r.net_balance) || 0,
    transactionCount: parseInt(r.transaction_count) || 0,
  }));

  return {
    totalIncome: parseFloat(row.total_income) || 0,
    totalExpense: parseFloat(row.total_expense) || 0,
    netBalance: parseFloat(row.net_balance) || 0,
    incomeThisMonth: parseFloat(row.income_this_month) || 0,
    expenseThisMonth: parseFloat(row.expense_this_month) || 0,
    highestTransaction: row.highest_transaction_amount
      ? {
          amount: parseFloat(row.highest_transaction_amount),
          type: row.highest_transaction_type,
          date: row.highest_transaction_date,
        }
      : null,
    averageTransactionValue: parseFloat(row.average_transaction_value) || 0,
    averageIncomeValue: parseFloat(row.average_income_value) || 0,
    averageExpenseValue: parseFloat(row.average_expense_value) || 0,
    monthlyTrend,
    currencyBreakdown,
  };
}

// =====================================================
// TIME-SERIES ANALYTICS SERVICE
// =====================================================

export async function getTimeSeriesStats(): Promise<TimeSeriesStats> {
  const [dailyRows, monthlyRows, peakRows] = await Promise.all([
    query(getDailyActivityQuery),
    query(getMonthlyGrowthQuery),
    query(getPeakUsageDayQuery),
  ]);

  const dailyActivity: DailyActivity[] = dailyRows.map((r) => ({
    date: r.date,
    transactionCount: parseInt(r.transaction_count) || 0,
    income: parseFloat(r.income) || 0,
    expense: parseFloat(r.expense) || 0,
    uniqueUsers: parseInt(r.unique_users) || 0,
  }));

  const monthlyGrowth: MonthlyGrowth[] = monthlyRows.map((r) => ({
    year: parseInt(r.year),
    month: parseInt(r.month),
    monthLabel: r.month_label,
    newUsers: parseInt(r.new_users) || 0,
    totalUsers: parseInt(r.total_users) || 0,
    transactions: parseInt(r.transactions) || 0,
    income: parseFloat(r.income) || 0,
    expense: parseFloat(r.expense) || 0,
  }));

  const peakUsageDay =
    peakRows.length > 0
      ? {
          date: peakRows[0].date,
          transactionCount: parseInt(peakRows[0].transaction_count) || 0,
        }
      : null;

  return {
    dailyActivity,
    monthlyGrowth,
    peakUsageDay,
  };
}

// =====================================================
// SYSTEM HEALTH SERVICE
// =====================================================

export async function getSystemHealthMetrics(): Promise<SystemHealthMetrics> {
  const rows = await query(getSystemHealthQuery);

  if (rows.length === 0) {
    throw new Error("Failed to fetch system health metrics");
  }

  const row = rows[0];

  // Calculate estimated database size
  const totalRows =
    parseInt(row.users_count) +
    parseInt(row.transactions_count) +
    parseInt(row.daily_summaries_count) +
    parseInt(row.monthly_summaries_count);

  // Rough estimate: ~1KB per row average
  const estimatedBytes = totalRows * 1024;
  const estimatedMB = (estimatedBytes / (1024 * 1024)).toFixed(2);

  return {
    lastTransactionTime: row.last_time || null,
    usersWithSyncIssues: parseInt(row.users_with_sync_issues) || 0,
    tableRowCounts: {
      users: parseInt(row.users_count) || 0,
      transactions: parseInt(row.transactions_count) || 0,
      dailySummaries: parseInt(row.daily_summaries_count) || 0,
      monthlySummaries: parseInt(row.monthly_summaries_count) || 0,
    },
    triggersHealth: {
      missingSummaries: parseInt(row.missing_summaries) || 0,
      inconsistentData: parseInt(row.missing_summaries) > 0,
    },
    databaseSize: {
      estimated: `${estimatedMB} MB`,
    },
  };
}

// =====================================================
// GLOBAL STATS SERVICE (OVERVIEW)
// =====================================================

export async function getGlobalStats(): Promise<GlobalStats> {
  // Fetch all metrics in parallel for performance
  const [userMetrics, transactionMetrics, financialMetrics, healthMetrics] =
    await Promise.all([
      getUserMetrics(),
      getTransactionMetrics(),
      getFinancialMetrics(),
      getSystemHealthMetrics(),
    ]);

  return {
    user: userMetrics,
    transaction: transactionMetrics,
    financial: {
      totalIncome: financialMetrics.totalIncome,
      totalExpense: financialMetrics.totalExpense,
      netBalance: financialMetrics.netBalance,
    },
    health: {
      lastTransactionTime: healthMetrics.lastTransactionTime,
      usersWithSyncIssues: healthMetrics.usersWithSyncIssues,
    },
    snapshot: {
      generatedAt: new Date().toISOString(),
      dataFreshness: "Real-time",
    },
  };
}

// =====================================================
// CLEANUP
// =====================================================

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  await closePool();
});

process.on("SIGINT", async () => {
  await closePool();
});
