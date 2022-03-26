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

export const topics = {
  userChanged: (uid: bigint) => `USER:${uid.toString()}:CHANGED`,
  userCreated: (aid: string, uid: bigint) =>
    `ACCOUNT:${aid}:USER:CREATED:${uid.toString()}`,
  accountChanged: (aid: string) => `ACCOUNT:${aid}:CHANGED`,
};
