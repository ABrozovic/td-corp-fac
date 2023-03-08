import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'throttle-debounce';
/**
 * A React Hook that filters an array using the Fuse.js fuzzy-search library.
 *
 * @param list The array to filter.
 * @param searchTerm The search term to filter by.
 * @param fuseOptions Options for Fuse.js.
 *
 * @returns The filtered array.
 *
 * @see https://fusejs.io/
 */
export const useFuse = <T>(
  list: T[] | undefined,
  matchAllOnEmptyQuery: boolean,
  searchOtions: Fuse.FuseSearchOptions,
  fuseOptions: Fuse.IFuseOptions<T>,
) => {
  const [query, updateQuery] = useState('');
  const { limit } = searchOtions;

  const fuse = useMemo(() => new Fuse(list || [], fuseOptions), [list, fuseOptions]);

  const hits = useMemo(
    () =>
      !query && list && matchAllOnEmptyQuery
        ? (list.map((item, refIndex) => ({
            item,
            refIndex,
          })) as Fuse.FuseResult<T>[])
        : fuse.search(query, { limit }),
    [fuse, limit, list, matchAllOnEmptyQuery, query],
  );

  const setQuery = debounce(220, updateQuery);

  const onSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => setQuery(e.currentTarget.value.trim()),
    [setQuery],
  );

  return {
    hits,
    onSearch,
    query,
    setQuery,
  };
};
