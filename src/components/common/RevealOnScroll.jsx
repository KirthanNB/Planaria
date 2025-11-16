"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function RevealOnScroll({
  children,
  delay = 0,
  yOffset = 40,
  className = "",
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.15,   // fire when 15% visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.8, delay }}
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
    >
      {children}
    </motion.div>
  );
}
