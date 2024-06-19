export class ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}

export class PaginatedResponse<T> {
  status: string;
  message: string;
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
