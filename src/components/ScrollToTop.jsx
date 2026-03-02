import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. 偵測路徑變動：換頁時自動回頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. 監聽捲動：決定右下角按鈕何時出現
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="back-to-top btn btn-primary-70 rounded-circle position-fixed d-flex align-items-center justify-content-center"
          style={{
            width: '50px',
            height: '50px',
            zIndex: 1050,
          }}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
