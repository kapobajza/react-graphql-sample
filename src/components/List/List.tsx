import { ReactElement, cloneElement, useCallback } from 'react';

import { ErrorContainer } from '../Container';
import { Loader } from '../Loading';

interface ListProps<TItem> {
  data: TItem[];
  renderItem: (item: TItem) => ReactElement | null;
  listKey?: ((item: TItem) => string) | string;
  renderListHeader?: () => ReactElement | null | undefined;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const List = <TItem extends { id?: string; [key: string]: any }>({
  data,
  renderItem,
  listKey,
  renderListHeader,
  isLoading,
  isError,
  error,
}: ListProps<TItem>): JSX.Element => {
  const mapFn = useCallback(
    (item: TItem) => {
      const Component = renderItem(item) || <></>;
      let key: string | undefined = item.id;

      if (listKey) {
        if (typeof listKey === 'string') {
          key = item[listKey];
        } else if (typeof listKey === 'function') {
          key = listKey(item);
        }
      }

      return cloneElement(Component, { key });
    },
    [listKey, renderItem],
  );

  if (isLoading) {
    return <Loader $center />;
  }

  if (isError && error) {
    return <ErrorContainer message={error.message} />;
  }

  return (
    <>
      {renderListHeader?.()}
      {data.map(mapFn)}
    </>
  );
};

export default List;
