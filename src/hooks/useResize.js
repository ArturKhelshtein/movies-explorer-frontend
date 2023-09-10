import React from 'react';
import { SCREEN_M, SCREEN_L, SCREEN_XL } from '../utils/const-breakpoints';

export function useResize() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = (event) => setWidth(event.target.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width
  // return {
  //   isScreenS: width <= SCREEN_M,
  //   isScreenM: width > SCREEN_M && width <= SCREEN_L,
  //   isScreenL: width > SCREEN_L && width <= SCREEN_XL,
  //   isScreenXL: width > SCREEN_XL };
}
