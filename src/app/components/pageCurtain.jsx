"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageCurtain() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Re-trigger curtain on every route change
    setVisible(true);
    setKey((k) => k + 1);
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            backgroundColor: "var(--chakra-colors-bg)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
