/**
 * Netlify Function: System Health Stats
 * Endpoint: /.netlify/functions/stats-health
 * Method: GET
 * Auth: Admin only
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getSystemHealthMetrics } from "./stats/services";
import {
  runMiddleware,
  authMiddleware,
  rateLimitMiddleware,
  getCorsHeaders,
  sanitizeError,
} from "./stats/middleware";
import type { StatsResponse, SystemHealthMetrics } from "./stats/types";

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
  ]);

  if (!middlewareResult.success) {
    return middlewareResult.response;
  }

  try {
    const stats = await getSystemHealthMetrics();

    const response: StatsResponse<SystemHealthMetrics> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        ...getCorsHeaders(event.headers.origin),
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30", // Cache for 30 seconds (system health needs frequent updates)
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error fetching system health stats:", error);

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
