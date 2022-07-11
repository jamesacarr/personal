export interface ErrorResponseBody {
  detail: string;
  status: number;
  title: string;
  type: string;
  instance?: string;
}
