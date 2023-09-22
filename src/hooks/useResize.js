import React from 'react';

export function useResize() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    let resizeTimeout;
    function resizeThrottler(event) {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler(event);
        }, 0);
      }
    }

    function actualResizeHandler(event) {
      setWidth(event.target.innerWidth);
    }
    window.addEventListener('resize', resizeThrottler);
    return () => window.removeEventListener('resize', resizeThrottler);
  }, []);


  return {
    width,
  };
}
