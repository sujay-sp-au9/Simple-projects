import { useState, useEffect } from "react";

export default function Route({ path, children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const onLocationChange = (e) => {
    setCurrentPath(window.location.pathname);
  };
  useEffect(() => {
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);
  if (currentPath === path) {
    return children;
  } else {
    return null;
  }
}
