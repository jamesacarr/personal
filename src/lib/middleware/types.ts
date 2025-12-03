import type { NextRequest, NextResponse } from 'next/server';

import type { AppRouteHandlerRoutes } from '.next/types/routes';

export type NextRoute<T extends AppRouteHandlerRoutes> = (
  request: NextRequest,
  context: RouteContext<T>,
) => Promise<NextResponse | Response> | NextResponse | Response;
export type Middleware = <T extends AppRouteHandlerRoutes>(
  handler: NextRoute<T>,
) => NextRoute<T>;

export interface ErrorResponseBody {
  detail: string;
  status: number;
  title: string;
  type: string;
  instance?: string;
}
