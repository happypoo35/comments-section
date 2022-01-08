import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktop = windowSize > 1024;
  const tablet = windowSize <= 768;
  const mobile = windowSize <= 670;

  return { desktop, tablet, mobile };
};

export default useWindowSize;
