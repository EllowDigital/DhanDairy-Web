/**
 * Shared TypeScript types for Stats (Frontend)
 * Matches backend types
 */

export interface StatsResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
  cached?: boolean;
}

// User Metrics
export interface UserMetrics {
  totalUsers: number;
  activeUsers7d: number;
  activeUsers30d: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
  usersWithTransactions: number;
  usersWithTransactionsPercent: number;
  churnedUsers: number;
  avgTransactionsPerUser: number;
}

// Transaction Metrics
export interface TransactionMetrics {
  totalTransactions: number;
  transactionsToday: number;
  transactionsThisMonth: number;
  avgTransactionsPerUser: number;
  incomeTransactionCount: number;
  expenseTransactionCount: number;
  deletedTransactionCount: number;
  syncBacklogCount: number;
  transactionGrowthRate: number;
}

// Financial Metrics
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
  monthLabel: string;
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

// Time-Series Analytics
export interface TimeSeriesStats {
  dailyActivity: DailyActivity[];
  monthlyGrowth: MonthlyGrowth[];
  peakUsageDay: {
    date: string;
    transactionCount: number;
  } | null;
}

export interface DailyActivity {
  date: string;
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

// System Health Metrics
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
    estimated: string;
  };
}

// Global Stats (Overview)
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
    dataFreshness: string;
  };
}

// Query Params
export interface StatsQueryParams {
  range?: "7d" | "30d" | "90d" | "12m" | "all";
  from?: string;
  to?: string;
}
