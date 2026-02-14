/**
 * Shared TypeScript types for Stats API
 * Production-grade type definitions
 */

export interface StatsResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
  cached?: boolean;
}

// =====================================================
// USER METRICS
// =====================================================
export interface UserMetrics {
  totalUsers: number;
  activeUsers7d: number;
  activeUsers30d: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  userGrowthRate: number; // Percentage
  usersWithTransactions: number;
  usersWithTransactionsPercent: number;
  churnedUsers: number; // No activity in 60+ days
  avgTransactionsPerUser: number;
}

// =====================================================
// TRANSACTION METRICS
// =====================================================
export interface TransactionMetrics {
  totalTransactions: number;
  transactionsToday: number;
  transactionsThisMonth: number;
  avgTransactionsPerUser: number;
  incomeTransactionCount: number;
  expenseTransactionCount: number;
  deletedTransactionCount: number;
  syncBacklogCount: number; // need_sync = true
  transactionGrowthRate: number;
}

// =====================================================
// FINANCIAL METRICS
// =====================================================
export interface FinancialMetrics {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  incomeThisMonth: number;
  expenseThisMonth: number;
  highestTransaction: {
    amount: number;
    type: "income" | "expense";
    date: string;
  } | null;
  averageTransactionValue: number;
  averageIncomeValue: number;
  averageExpenseValue: number;
  monthlyTrend: MonthlyFinancialTrend[];
  currencyBreakdown: CurrencyBreakdown[];
}

export interface MonthlyFinancialTrend {
  year: number;
  month: number;
  monthLabel: string; // "Jan 2026"
  income: number;
  expense: number;
  net: number;
  transactionCount: number;
}

export interface CurrencyBreakdown {
  currency: string;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  transactionCount: number;
}

// =====================================================
// TIME-SERIES ANALYTICS
// =====================================================
export interface TimeSeriesStats {
  dailyActivity: DailyActivity[];
  monthlyGrowth: MonthlyGrowth[];
  peakUsageDay: {
    date: string;
    transactionCount: number;
  } | null;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  transactionCount: number;
  income: number;
  expense: number;
  uniqueUsers: number;
}

export interface MonthlyGrowth {
  year: number;
  month: number;
  monthLabel: string;
  newUsers: number;
  totalUsers: number;
  transactions: number;
  income: number;
  expense: number;
}

// =====================================================
// SYSTEM HEALTH METRICS
// =====================================================
export interface SystemHealthMetrics {
  lastTransactionTime: string | null;
  usersWithSyncIssues: number;
  tableRowCounts: {
    users: number;
    transactions: number;
    dailySummaries: number;
    monthlySummaries: number;
  };
  triggersHealth: {
    missingSummaries: number;
    inconsistentData: boolean;
  };
  databaseSize: {
    estimated: string; // "12.5 MB"
  };
}

// =====================================================
// GLOBAL STATS (OVERVIEW)
// =====================================================
export interface GlobalStats {
  user: UserMetrics;
  transaction: TransactionMetrics;
  financial: Pick<
    FinancialMetrics,
    "totalIncome" | "totalExpense" | "netBalance"
  >;
  health: Pick<
    SystemHealthMetrics,
    "lastTransactionTime" | "usersWithSyncIssues"
  >;
  snapshot: {
    generatedAt: string;
    dataFreshness: string; // "Real-time"
  };
}

// =====================================================
// API REQUEST TYPES
// =====================================================
export interface StatsQueryParams {
  range?: "7d" | "30d" | "90d" | "12m" | "all";
  from?: string; // ISO date
  to?: string; // ISO date
}

// =====================================================
// INTERNAL DATABASE TYPES
// =====================================================
export interface DBUser {
  id: string;
  clerk_id: string | null;
  email: string;
  name: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  server_version: number;
}

export interface DBTransaction {
  id: string;
  user_id: string;
  client_id: string | null;
  server_version: number;
  type: "income" | "expense";
  amount: number;
  category: string | null;
  note: string | null;
  currency: string;
  date: string;
  sync_status: number;
  need_sync: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
