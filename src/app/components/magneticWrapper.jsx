"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { damping: 20, stiffness: 300, mass: 0.6 };

/**
 * Wraps any element and makes it physically attract toward the cursor
 * when the mouse is within `distance` pixels of its centre.
 *
 * Usage:
 *   <MagneticWrapper>
 *     <button>Click me</button>
 *   </MagneticWrapper>
 */
export default function MagneticWrapper({ children, distance = 80, strength = 0.35, className, style }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < distance) {
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    }
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y, display: "inline-flex", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
