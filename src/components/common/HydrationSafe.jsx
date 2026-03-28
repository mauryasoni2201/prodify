"use client";
import { useState, useEffect } from "react";

const HydrationSafe = ({ children, fallback = null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return fallback;

  return <>{children}</>;
};

export default HydrationSafe;
