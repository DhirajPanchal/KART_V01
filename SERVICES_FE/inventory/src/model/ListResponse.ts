export interface ListResponse<T> {
  list: T[];

  index: number;

  size: number;

  totalElements: number;

  totalPages: number;

  lastPage: boolean;
}
