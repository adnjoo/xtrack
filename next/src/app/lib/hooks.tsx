import React, { useEffect, useState } from 'react';

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
