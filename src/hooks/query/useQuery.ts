import {
  QueryFunction,
  QueryKey,
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> => {
  return useReactQuery(queryKey, queryFn, options);
};

export default useQuery;
