/**
 * Optimized SQL queries for Stats API
 * Production-ready, indexed, safe for high-volume databases
 */

// =====================================================
// USER METRICS QUERIES
// =====================================================

export const getUserMetricsQuery = `
WITH
  user_counts AS (
    SELECT 
      COUNT(*) AS total_users,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS new_users_7d,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS new_users_30d,
      COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) AS new_users_today,
      COUNT(*) FILTER (WHERE updated_at >= NOW() - INTERVAL '7 days') AS active_users_7d,
      COUNT(*) FILTER (WHERE updated_at >= NOW() - INTERVAL '30 days') AS active_users_30d
    FROM users
    WHERE status = 'active'
  ),
  user_transactions AS (
    SELECT 
      COUNT(DISTINCT user_id) AS users_with_transactions
    FROM transactions
    WHERE deleted_at IS NULL
  ),
  churned_users AS (
    SELECT COUNT(*) AS churned_count
    FROM users u
    WHERE status = 'active'
      AND NOT EXISTS (
        SELECT 1 FROM transactions t 
        WHERE t.user_id = u.id 
          AND t.deleted_at IS NULL 
          AND t.created_at >= NOW() - INTERVAL '60 days'
      )
      AND u.created_at < NOW() - INTERVAL '60 days'
  ),
  avg_transactions AS (
    SELECT 
      CASE 
        WHEN COUNT(DISTINCT user_id) > 0 
        THEN COUNT(*)::FLOAT / COUNT(DISTINCT user_id) 
        ELSE 0 
      END AS avg_per_user
    FROM transactions
    WHERE deleted_at IS NULL
  )
SELECT 
  uc.total_users,
  uc.active_users_7d,
  uc.active_users_30d,
  uc.new_users_today,
  uc.new_users_30d AS new_users_this_month,
  CASE 
    WHEN uc.total_users - uc.new_users_30d > 0 
    THEN ROUND(((uc.new_users_30d::FLOAT / (uc.total_users - uc.new_users_30d)) * 100)::numeric, 2)
    ELSE 0 
  END AS user_growth_rate,
  COALESCE(ut.users_with_transactions, 0) AS users_with_transactions,
  CASE 
    WHEN uc.total_users > 0 
    THEN ROUND(((COALESCE(ut.users_with_transactions, 0)::FLOAT / uc.total_users) * 100)::numeric, 2)
    ELSE 0 
  END AS users_with_transactions_percent,
  cu.churned_count AS churned_users,
  ROUND(at.avg_per_user::numeric, 2) AS avg_transactions_per_user
FROM user_counts uc
CROSS JOIN user_transactions ut
CROSS JOIN churned_users cu
CROSS JOIN avg_transactions at;
`;

// =====================================================
// TRANSACTION METRICS QUERIES
// =====================================================

export const getTransactionMetricsQuery = `
WITH
  transaction_counts AS (
    SELECT 
      COUNT(*) FILTER (WHERE deleted_at IS NULL) AS total_transactions,
      COUNT(*) FILTER (WHERE deleted_at IS NULL AND date >= CURRENT_DATE) AS transactions_today,
      COUNT(*) FILTER (WHERE deleted_at IS NULL AND date >= DATE_TRUNC('month', CURRENT_DATE)) AS transactions_this_month,
      COUNT(*) FILTER (WHERE type = 'income' AND deleted_at IS NULL) AS income_count,
      COUNT(*) FILTER (WHERE type = 'expense' AND deleted_at IS NULL) AS expense_count,
      COUNT(*) FILTER (WHERE deleted_at IS NOT NULL) AS deleted_count,
      COUNT(*) FILTER (WHERE need_sync = true AND deleted_at IS NULL) AS sync_backlog,
      COUNT(DISTINCT user_id) FILTER (WHERE deleted_at IS NULL) AS users_with_transactions
    FROM transactions
  ),
  growth_rate AS (
    SELECT 
      CASE 
        WHEN COUNT(*) FILTER (WHERE date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' 
                              AND date < DATE_TRUNC('month', CURRENT_DATE)
                              AND deleted_at IS NULL) > 0
        THEN ROUND(
          (((COUNT(*) FILTER (WHERE date >= DATE_TRUNC('month', CURRENT_DATE) AND deleted_at IS NULL)::FLOAT 
            - COUNT(*) FILTER (WHERE date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' 
                                AND date < DATE_TRUNC('month', CURRENT_DATE) 
                                AND deleted_at IS NULL)::FLOAT)
          / COUNT(*) FILTER (WHERE date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' 
                              AND date < DATE_TRUNC('month', CURRENT_DATE) 
                              AND deleted_at IS NULL)::FLOAT) 
          * 100)::numeric, 2)
        ELSE 0
      END AS transaction_growth_rate
    FROM transactions
  )
SELECT 
  tc.total_transactions,
  tc.transactions_today,
  tc.transactions_this_month,
  CASE 
    WHEN tc.users_with_transactions > 0 
    THEN ROUND((tc.total_transactions::FLOAT / tc.users_with_transactions)::numeric, 2)
    ELSE 0 
  END AS avg_transactions_per_user,
  tc.income_count AS income_transaction_count,
  tc.expense_count AS expense_transaction_count,
  tc.deleted_count AS deleted_transaction_count,
  tc.sync_backlog AS sync_backlog_count,
  gr.transaction_growth_rate
FROM transaction_counts tc
CROSS JOIN growth_rate gr;
`;

// =====================================================
// FINANCIAL METRICS QUERIES
// =====================================================

export const getFinancialMetricsQuery = `
WITH
  totals AS (
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
      COALESCE(AVG(amount), 0) AS avg_transaction_value,
      COALESCE(AVG(CASE WHEN type = 'income' THEN amount END), 0) AS avg_income_value,
      COALESCE(AVG(CASE WHEN type = 'expense' THEN amount END), 0) AS avg_expense_value
    FROM transactions
    WHERE deleted_at IS NULL
  ),
  this_month AS (
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS income_this_month,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expense_this_month
    FROM transactions
    WHERE deleted_at IS NULL
      AND date >= DATE_TRUNC('month', CURRENT_DATE)
  ),
  highest_transaction AS (
    SELECT 
      amount,
      type,
      date
    FROM transactions
    WHERE deleted_at IS NULL
    ORDER BY amount DESC
    LIMIT 1
  )
SELECT 
  ROUND(t.total_income, 2) AS total_income,
  ROUND(t.total_expense, 2) AS total_expense,
  ROUND(t.total_income - t.total_expense, 2) AS net_balance,
  ROUND(tm.income_this_month, 2) AS income_this_month,
  ROUND(tm.expense_this_month, 2) AS expense_this_month,
  ROUND(t.avg_transaction_value, 2) AS average_transaction_value,
  ROUND(t.avg_income_value, 2) AS average_income_value,
  ROUND(t.avg_expense_value, 2) AS average_expense_value,
  ht.amount AS highest_transaction_amount,
  ht.type AS highest_transaction_type,
  ht.date AS highest_transaction_date
FROM totals t
CROSS JOIN this_month tm
LEFT JOIN highest_transaction ht ON true;
`;

export const getMonthlyTrendQuery = `
SELECT 
  ms.year,
  ms.month,
  TO_CHAR(MAKE_DATE(ms.year, ms.month, 1), 'Mon YYYY') AS month_label,
  ROUND(ms.total_in, 2) AS income,
  ROUND(ms.total_out, 2) AS expense,
  ROUND(ms.total_in - ms.total_out, 2) AS net,
  ms.count AS transaction_count
FROM monthly_summaries ms
WHERE ms.updated_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
ORDER BY ms.year DESC, ms.month DESC
LIMIT 12;
`;

export const getCurrencyBreakdownQuery = `
SELECT 
  currency,
  ROUND(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 2) AS total_income,
  ROUND(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 2) AS total_expense,
  ROUND(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 2) AS net_balance,
  COUNT(*) AS transaction_count
FROM transactions
WHERE deleted_at IS NULL
GROUP BY currency
ORDER BY transaction_count DESC;
`;

// =====================================================
// TIME-SERIES ANALYTICS QUERIES
// =====================================================

export const getDailyActivityQuery = `
SELECT 
  ds.date::TEXT AS date,
  ds.count AS transaction_count,
  ROUND(ds.total_in, 2) AS income,
  ROUND(ds.total_out, 2) AS expense,
  COUNT(DISTINCT t.user_id) AS unique_users
FROM daily_summaries ds
LEFT JOIN transactions t ON t.user_id = ds.user_id 
  AND t.date::DATE = ds.date 
  AND t.deleted_at IS NULL
WHERE ds.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY ds.date, ds.count, ds.total_in, ds.total_out
ORDER BY ds.date DESC;
`;

export const getMonthlyGrowthQuery = `
WITH user_growth AS (
  SELECT 
    EXTRACT(YEAR FROM created_at)::INT AS year,
    EXTRACT(MONTH FROM created_at)::INT AS month,
    COUNT(*) AS new_users
  FROM users
  WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
  GROUP BY year, month
),
total_users_per_month AS (
  SELECT 
    EXTRACT(YEAR FROM d)::INT AS year,
    EXTRACT(MONTH FROM d)::INT AS month,
    (SELECT COUNT(*) FROM users WHERE created_at <= d) AS total_users
  FROM generate_series(
    DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months',
    DATE_TRUNC('month', CURRENT_DATE),
    '1 month'::INTERVAL
  ) AS d
)
SELECT 
  ms.year,
  ms.month,
  TO_CHAR(MAKE_DATE(ms.year, ms.month, 1), 'Mon YYYY') AS month_label,
  COALESCE(ug.new_users, 0) AS new_users,
  COALESCE(tu.total_users, 0) AS total_users,
  ms.count AS transactions,
  ROUND(ms.total_in, 2) AS income,
  ROUND(ms.total_out, 2) AS expense
FROM monthly_summaries ms
LEFT JOIN user_growth ug ON ug.year = ms.year AND ug.month = ms.month
LEFT JOIN total_users_per_month tu ON tu.year = ms.year AND tu.month = ms.month
WHERE MAKE_DATE(ms.year, ms.month, 1) >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
ORDER BY ms.year DESC, ms.month DESC
LIMIT 12;
`;

export const getPeakUsageDayQuery = `
SELECT 
  date::TEXT,
  count AS transaction_count
FROM daily_summaries
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY count DESC
LIMIT 1;
`;

// =====================================================
// SYSTEM HEALTH QUERIES
// =====================================================

export const getSystemHealthQuery = `
WITH 
  last_transaction AS (
    SELECT MAX(created_at) AS last_time
    FROM transactions
    WHERE deleted_at IS NULL
  ),
  sync_issues AS (
    SELECT COUNT(DISTINCT user_id) AS users_with_issues
    FROM transactions
    WHERE need_sync = true AND deleted_at IS NULL
  ),
  row_counts AS (
    SELECT 
      (SELECT COUNT(*) FROM users) AS users_count,
      (SELECT COUNT(*) FROM transactions) AS transactions_count,
      (SELECT COUNT(*) FROM daily_summaries) AS daily_summaries_count,
      (SELECT COUNT(*) FROM monthly_summaries) AS monthly_summaries_count
  ),
  missing_summaries AS (
    SELECT COUNT(DISTINCT date::DATE) AS missing_days
    FROM generate_series(
      CURRENT_DATE - INTERVAL '30 days',
      CURRENT_DATE,
      '1 day'::INTERVAL
    ) AS date
    WHERE NOT EXISTS (
      SELECT 1 FROM daily_summaries ds
      WHERE ds.date = date::DATE
    )
  )
SELECT 
  lt.last_time,
  COALESCE(si.users_with_issues, 0) AS users_with_sync_issues,
  rc.users_count,
  rc.transactions_count,
  rc.daily_summaries_count,
  rc.monthly_summaries_count,
  ms.missing_days AS missing_summaries
FROM last_transaction lt
CROSS JOIN sync_issues si
CROSS JOIN row_counts rc
CROSS JOIN missing_summaries ms;
`;
