/**
 * Authentication and validation middleware for Stats API
 * Production-grade security for admin-only endpoints
 */

import type { HandlerEvent, HandlerContext } from "@netlify/functions";

// =====================================================
// TYPES
// =====================================================

export interface AuthResult {
  authorized: boolean;
  userId?: string;
  role?: string;
  error?: string;
}

// =====================================================
// ADMIN AUTHENTICATION
// =====================================================

/**
 * Validates admin access token
 * In production, this should validate JWT tokens or API keys
 */
export function validateAdminAuth(event: HandlerEvent): AuthResult {
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!authHeader) {
    return {
      authorized: false,
      error: "Missing authorization header",
    };
  }

  // Extract token
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  // Validate against admin API key
  const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

  if (!ADMIN_API_KEY) {
    console.error("ADMIN_API_KEY environment variable not set");
    return {
      authorized: false,
      error: "Server configuration error",
    };
  }

  if (token !== ADMIN_API_KEY) {
    return {
      authorized: false,
      error: "Invalid credentials",
    };
  }

  return {
    authorized: true,
    role: "admin",
  };
}

/**
 * Alternative: JWT-based authentication (for future implementation)
 * Uncomment and install 'jsonwebtoken' package if using JWT
 */
/*
import jwt from 'jsonwebtoken';

export function validateJWT(event: HandlerEvent): AuthResult {
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!authHeader) {
    return {
      authorized: false,
      error: 'Missing authorization header',
    };
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader;

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Check for admin role
    if (decoded.role !== 'admin') {
      return {
        authorized: false,
        error: 'Insufficient permissions',
      };
    }

    return {
      authorized: true,
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    return {
      authorized: false,
      error: 'Invalid or expired token',
    };
  }
}
*/

// =====================================================
// REQUEST VALIDATION
// =====================================================

/**
 * Validates query parameters
 */
export function validateQueryParams(event: HandlerEvent): {
  valid: boolean;
  params?: Record<string, string>;
  error?: string;
} {
  const params = event.queryStringParameters || {};

  // Validate 'range' parameter if provided
  if (params.range) {
    const validRanges = ["7d", "30d", "90d", "12m", "all"];
    if (!validRanges.includes(params.range)) {
      return {
        valid: false,
        error: `Invalid range. Must be one of: ${validRanges.join(", ")}`,
      };
    }
  }

  // Validate date parameters if provided
  if (params.from || params.to) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (params.from && !dateRegex.test(params.from)) {
      return {
        valid: false,
        error: 'Invalid "from" date format. Use YYYY-MM-DD',
      };
    }

    if (params.to && !dateRegex.test(params.to)) {
      return {
        valid: false,
        error: 'Invalid "to" date format. Use YYYY-MM-DD',
      };
    }

    // Validate date range
    if (params.from && params.to) {
      const fromDate = new Date(params.from);
      const toDate = new Date(params.to);

      if (fromDate > toDate) {
        return {
          valid: false,
          error: '"from" date must be before "to" date',
        };
      }
    }
  }

  return {
    valid: true,
    params,
  };
}

// =====================================================
// RATE LIMITING (SIMPLE IN-MEMORY)
// =====================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory rate limiting
 * For production, use Redis or similar distributed cache
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 100,
  windowMs = 60000,
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt < now) {
    // New window
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(event: HandlerEvent): string {
  // Try to get IP from various headers
  const forwarded = event.headers["x-forwarded-for"];
  const realIp = event.headers["x-real-ip"];
  const clientIp = forwarded?.split(",")[0] || realIp || "unknown";

  return clientIp;
}

// =====================================================
// CORS HANDLING
// =====================================================

export function getCorsHeaders(origin?: string): Record<string, string> {
  // In production, validate against allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];

  const requestOrigin = origin || "*";
  const allowOrigin =
    allowedOrigins.includes("*") || allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

// =====================================================
// ERROR SANITIZATION
// =====================================================

/**
 * Sanitizes error messages to prevent information leakage
 */
export function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    // Don't expose internal error details in production
    if (process.env.NODE_ENV === "production") {
      // Log full error server-side
      console.error("Internal error:", error);
      return "An internal error occurred";
    }
    return error.message;
  }
  return "An unexpected error occurred";
}

// =====================================================
// MIDDLEWARE COMPOSER
// =====================================================

export interface MiddlewareContext {
  event: HandlerEvent;
  context: HandlerContext;
  auth?: AuthResult;
  params?: Record<string, string>;
}

export type MiddlewareFunction = (ctx: MiddlewareContext) => Promise<{
  continue: boolean;
  response?: Response;
}>;

/**
 * Composes multiple middleware functions
 */
export async function runMiddleware(
  event: HandlerEvent,
  context: HandlerContext,
  middlewares: MiddlewareFunction[],
): Promise<{ success: boolean; ctx?: MiddlewareContext; response?: Response }> {
  const ctx: MiddlewareContext = { event, context };

  for (const middleware of middlewares) {
    const result = await middleware(ctx);
    if (!result.continue) {
      return { success: false, response: result.response };
    }
  }

  return { success: true, ctx };
}

// =====================================================
// COMMON MIDDLEWARE FUNCTIONS
// =====================================================

export const authMiddleware: MiddlewareFunction = async (ctx) => {
  const auth = validateAdminAuth(ctx.event);

  if (!auth.authorized) {
    return {
      continue: false,
      response: {
        statusCode: 401,
        headers: getCorsHeaders(ctx.event.headers.origin),
        body: JSON.stringify({
          success: false,
          error: auth.error || "Unauthorized",
        }),
      },
    };
  }

  ctx.auth = auth;
  return { continue: true };
};

export const rateLimitMiddleware: MiddlewareFunction = async (ctx) => {
  const identifier = getClientIdentifier(ctx.event);
  const { allowed, remaining, resetAt } = checkRateLimit(identifier);

  if (!allowed) {
    return {
      continue: false,
      response: {
        statusCode: 429,
        headers: {
          ...getCorsHeaders(ctx.event.headers.origin),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": resetAt.toString(),
        },
        body: JSON.stringify({
          success: false,
          error: "Rate limit exceeded",
        }),
      },
    };
  }

  return { continue: true };
};

export const validationMiddleware: MiddlewareFunction = async (ctx) => {
  const validation = validateQueryParams(ctx.event);

  if (!validation.valid) {
    return {
      continue: false,
      response: {
        statusCode: 400,
        headers: getCorsHeaders(ctx.event.headers.origin),
        body: JSON.stringify({
          success: false,
          error: validation.error,
        }),
      },
    };
  }

  ctx.params = validation.params;
  return { continue: true };
};
