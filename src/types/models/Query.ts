import {
  UseInfiniteQueryResult as RQUseInfiniteQueryResult,
  UseInfiniteQueryOptions as RQUseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
} from 'react-query';

export interface UseInfiniteQueryResult<TData = unknown, TError = Error>
  extends Omit<RQUseInfiniteQueryResult<TData, TError>, 'data'> {
  data: TData[] | undefined;
  onEndReached: () => Promise<void>;
}

export interface UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<
    RQUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
    'select'
  > {
  select?: (params: InfiniteData<TQueryFnData>) => TData[];
  limit?: number;
}

export interface PaginatedResult<TData> {
  records: TData[];
  page?: number;
  limit?: number;
}

export type QueryFnOptions = {
  page: number;
  limit: number;
};
