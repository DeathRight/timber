export enum SortingOrder {
  DESC = "DESC",
  ASC = "ASC",
}

export interface CursorConfig {
  before?: string;
  after?: string;
  limit: number;
  order: SortingOrder;
}

export interface PageResult<T = any> {
  result: any[];
  count: number;
}
