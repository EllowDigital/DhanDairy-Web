/**
 * Frontend API client for Stats endpoints
 * Uses React Query for caching and state management
 */

import type {
  StatsResponse,
  GlobalStats,
  UserMetrics,
  TransactionMetrics,
  FinancialMetrics,
  TimeSeriesStats,
  SystemHealthMetrics,
  StatsQueryParams,
} from "@/types/stats";

// =====================================================
// CONFIGURATION
// =====================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/.netlify/functions";

const getAuthToken = (): string => {
  // Get from environment or secure storage
  return import.meta.env.VITE_ADMIN_API_KEY || "";
};

// =====================================================
// FETCH WRAPPER
// =====================================================

async function fetchStats<T>(
  endpoint: string,
  params?: StatsQueryParams,
): Promise<StatsResponse<T>> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      success: false,
      error: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.error || "Failed to fetch stats");
  }

  return response.json();
}

// =====================================================
// API FUNCTIONS
// =====================================================

export async function fetchGlobalStats(): Promise<GlobalStats> {
  const response = await fetchStats<GlobalStats>("stats-global");
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch global stats");
  }
  return response.data;
}

export async function fetchUserStats(): Promise<UserMetrics> {
  const response = await fetchStats<UserMetrics>("stats-users");
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch user stats");
  }
  return response.data;
}

export async function fetchTransactionStats(): Promise<TransactionMetrics> {
  const response = await fetchStats<TransactionMetrics>("stats-transactions");
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch transaction stats");
  }
  return response.data;
}

export async function fetchFinancialStats(): Promise<FinancialMetrics> {
  const response = await fetchStats<FinancialMetrics>("stats-finance");
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch financial stats");
  }
  return response.data;
}

export async function fetchTimeSeriesStats(
  params?: StatsQueryParams,
): Promise<TimeSeriesStats> {
  const response = await fetchStats<TimeSeriesStats>(
    "stats-timeseries",
    params,
  );
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch time-series stats");
  }
  return response.data;
}

export async function fetchSystemHealthStats(): Promise<SystemHealthMetrics> {
  const response = await fetchStats<SystemHealthMetrics>("stats-health");
  if (!response.success || !response.data) {
    throw new Error(response.error || "Failed to fetch system health stats");
  }
  return response.data;
}

// =====================================================
// REACT QUERY KEYS
// =====================================================

export const statsKeys = {
  all: ["stats"] as const,
  global: () => [...statsKeys.all, "global"] as const,
  users: () => [...statsKeys.all, "users"] as const,
  transactions: () => [...statsKeys.all, "transactions"] as const,
  finance: () => [...statsKeys.all, "finance"] as const,
  timeseries: (params?: StatsQueryParams) =>
    [...statsKeys.all, "timeseries", params] as const,
  health: () => [...statsKeys.all, "health"] as const,
};
