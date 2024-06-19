import { ApiResponse, PaginatedResponse } from '../dto/apiResponse.dto';

export function createResponse<T>(
  status: any,
  message: string,
  data?: T,
): ApiResponse<T> {
  return { status, message, data };
}

export function createPaginatedResponse<T>(payload: {
  status: any;
  message: string;
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}): PaginatedResponse<T> {
  return payload;
}
