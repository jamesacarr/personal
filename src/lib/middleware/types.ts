import type { NextRequest, NextResponse } from 'next/server';

export type NextRoute = (
  request: NextRequest,
) => Promise<NextResponse | Response> | NextResponse | Response;
export type Middleware = (route: NextRoute) => NextRoute;

export interface ErrorResponseBody {
  detail: string;
  status: number;
  title: string;
  type: string;
  instance?: string;
}
