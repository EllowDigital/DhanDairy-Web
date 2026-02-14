/**
 * Reusable Metric Card Component
 * Displays a single metric with optional trend indicator
 * Enhanced with modern styling and responsive design
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  className,
  loading = false,
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value === 0) return <Minus className="h-3 w-3 sm:h-4 sm:w-4" />;
    return trend.value > 0 ? (
      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
    ) : (
      <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
    );
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value === 0) return "text-muted-foreground";
    if (trend.isPositive === undefined) {
      return trend.value > 0
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400";
    }
    return trend.isPositive
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  if (loading) {
    return (
      <Card className={cn("hover:shadow-md transition-shadow", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          {icon && <Skeleton className="h-4 w-4 rounded" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-7 sm:h-8 w-full mb-2" />
          <Skeleton className="h-3 sm:h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn("hover:shadow-md transition-all duration-200", className)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground opacity-70">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
          {value}
        </div>
        {(subtitle || trend) && (
          <div className="mt-1 sm:mt-2 flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 sm:gap-1 font-medium",
                  getTrendColor(),
                )}
              >
                {getTrendIcon()}
                {Math.abs(trend.value).toFixed(1)}%
              </span>
            )}
            {subtitle && (
              <span className="text-muted-foreground truncate">{subtitle}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
