import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls page to top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default ScrollToTop;
