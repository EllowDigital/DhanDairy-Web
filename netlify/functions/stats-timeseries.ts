/**
 * Netlify Function: Time-Series Stats
 * Endpoint: /.netlify/functions/stats-timeseries
 * Method: GET
 * Auth: Admin only
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getTimeSeriesStats } from "./stats/services";
import {
  runMiddleware,
  authMiddleware,
  rateLimitMiddleware,
  validationMiddleware,
  getCorsHeaders,
  sanitizeError,
} from "./stats/middleware";
import type { StatsResponse, TimeSeriesStats } from "./stats/types";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getCorsHeaders(event.headers.origin),
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: getCorsHeaders(event.headers.origin),
      body: JSON.stringify({
        success: false,
        error: "Method not allowed",
      }),
    };
  }

  const middlewareResult = await runMiddleware(event, context, [
    rateLimitMiddleware,
    authMiddleware,
    validationMiddleware,
  ]);

  if (!middlewareResult.success) {
    return middlewareResult.response;
  }

  try {
    const stats = await getTimeSeriesStats();

    const response: StatsResponse<TimeSeriesStats> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        ...getCorsHeaders(event.headers.origin),
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes (historical data)
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error fetching time-series stats:", error);

    const response: StatsResponse = {
      success: false,
      error: sanitizeError(error),
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 500,
      headers: {
        ...getCorsHeaders(event.headers.origin),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  }
};

export { handler };
