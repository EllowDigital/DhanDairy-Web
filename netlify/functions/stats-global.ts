/**
 * Netlify Function: Global Stats Overview
 * Endpoint: /.netlify/functions/stats-global
 * Method: GET
 * Auth: Admin only
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getGlobalStats } from "./stats/services";
import {
  runMiddleware,
  authMiddleware,
  rateLimitMiddleware,
  getCorsHeaders,
  sanitizeError,
} from "./stats/middleware";
import type { StatsResponse, GlobalStats } from "./stats/types";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getCorsHeaders(event.headers.origin),
      body: "",
    };
  }

  // Only allow GET requests
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

  // Run middleware
  const middlewareResult = await runMiddleware(event, context, [
    rateLimitMiddleware,
    authMiddleware,
  ]);

  if (!middlewareResult.success) {
    return middlewareResult.response;
  }

  try {
    // Fetch global stats
    const stats = await getGlobalStats();

    const response: StatsResponse<GlobalStats> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        ...getCorsHeaders(event.headers.origin),
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60", // Cache for 1 minute
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error fetching global stats:", error);

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
