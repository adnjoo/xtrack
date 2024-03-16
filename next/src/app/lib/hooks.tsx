import React, { useEffect, useState } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

/**
 * Checks if the screen is a mobile screen.
 *
 * @return {boolean}
 */
export const useCheckMobileScreen = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width <= 768;
};

/**
 * Retrieves the query data for the given key using the query client.
 *
 * @param {QueryKey} key - The key used to identify the query data
 * @return {any} The query data associated with the key
 */
export const useGetFetchQuery = (key: QueryKey) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
};
