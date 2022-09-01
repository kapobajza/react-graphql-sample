import { ReactElement, cloneElement, useCallback } from 'react';

interface ListProps<TItem> {
  data: TItem[];
  renderItem: (item: TItem) => ReactElement | null;
  listKey?: ((item: TItem) => string) | string;
  renderListHeader?: () => ReactElement | null | undefined;
}

const List = <TItem extends { id?: string; [key: string]: any }>({
  data,
  renderItem,
  listKey,
  renderListHeader,
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

  return (
    <>
      {renderListHeader?.()}
      {data.map(mapFn)}
    </>
  );
};

export default List;
