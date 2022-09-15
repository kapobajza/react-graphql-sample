import { ReactElement, cloneElement, useCallback, useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';

import { ErrorContainer } from '../Container';
import { Text } from '../Text';
import { Loader } from '../Loading';
import { useTranslation } from '../../translation';

interface ListProps<TItem> {
  data: TItem[];
  renderItem: (item: TItem) => ReactElement | null;
  listKey?: ((item: TItem) => string) | string;
  renderListHeader?: () => ReactElement | null | undefined;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onEndReached?: () => Promise<void>;
  scrollThreshold?: number;
  isLoadingMore?: boolean;
}

const List = <TItem extends { id?: string; [key: string]: any }>({
  data,
  renderItem,
  listKey,
  renderListHeader,
  isLoading,
  isError,
  error,
  onEndReached,
  scrollThreshold = 0.8,
  isLoadingMore,
}: ListProps<TItem>): JSX.Element => {
  const { strings } = useTranslation();
  const promiseRef = useRef<Promise<void>>();

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

  useEffect(() => {
    const handleScroll = async () => {
      const target = document.documentElement.scrollTop ? document.documentElement : document.body;

      if (target) {
        const clientHeight = window.screen.availHeight;

        if (
          target.scrollTop + clientHeight >= scrollThreshold * target.scrollHeight &&
          onEndReached
        ) {
          if (!promiseRef.current) {
            promiseRef.current = (async () => {
              try {
                await onEndReached();
              } finally {
                promiseRef.current = undefined;
              }
            })();
          }
        }
      }
    };

    const throttledHandleScroll = throttle(150, handleScroll);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {isLoadingMore ? <Text>{strings.loading}</Text> : null}
    </>
  );
};

export default List;
