/**
 * Netlify Function: Transaction Stats
 * Endpoint: /.netlify/functions/stats-transactions
 * Method: GET
 * Auth: Admin only
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getTransactionMetrics } from "./stats/services";
import {
  runMiddleware,
  authMiddleware,
  rateLimitMiddleware,
  getCorsHeaders,
  sanitizeError,
} from "./stats/middleware";
import type { StatsResponse, TransactionMetrics } from "./stats/types";

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
    const stats = await getTransactionMetrics();

    const response: StatsResponse<TransactionMetrics> = {
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        ...getCorsHeaders(event.headers.origin),
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error fetching transaction stats:", error);

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
