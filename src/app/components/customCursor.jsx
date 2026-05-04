"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useColorMode } from "../color-mode";

const SLOW_SPRING = { damping: 22, stiffness: 180, mass: 0.8 };

export default function CustomCursor() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  // Theme-aware colours
  const dotColor = isDark ? "#ffffff" : "#111111";
  const ringColor = isDark ? "#ffffff" : "#111111";
  const ringFill = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const ringStroke = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringRawX = useRef(useMotionValue(-100));
  const ringRawY = useRef(useMotionValue(-100));
  const springRingX = useSpring(ringRawX.current, SLOW_SPRING);
  const springRingY = useSpring(ringRawY.current, SLOW_SPRING);

  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const touchCheck = () => { isTouchRef.current = true; setHidden(true); };
    window.addEventListener("touchstart", touchCheck, { once: true });

    const onMove = (e) => {
      if (isTouchRef.current) return;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringRawX.current.set(e.clientX);
      ringRawY.current.set(e.clientY);
    };
    const onEnter = () => { if (!isTouchRef.current) setHidden(false); };
    const onLeave = () => setHidden(true);
    const onMouseOver = (e) => {
      if (isTouchRef.current) return;
      const el = e.target.closest("button, a, [role='button'], [data-cursor='pointer'], input, textarea, select, label");
      setHovered(!!el);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onMouseOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("touchstart", touchCheck);
    };
  }, [dotX, dotY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Small dot — direct follow */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: dotColor,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s, height 0.15s, opacity 0.2s, background-color 0.3s",
        }}
        animate={{
          width: hovered ? 8 : 5,
          height: hovered ? 8 : 5,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — spring follow */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springRingX,
          y: springRingY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99998,
          borderRadius: "50%",
        }}
        animate={{
          width: hovered ? 44 : 30,
          height: hovered ? 44 : 30,
          border: `1.5px solid ${ringStroke}`,
          backgroundColor: hovered ? ringFill : "rgba(0,0,0,0)",
          opacity: hidden ? 0 : 1,
          transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        }}
      />
    </>
  );
}
