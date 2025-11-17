"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// --------------------------------------
// 🔥 WORDS + GIFS
// --------------------------------------
const WORDS = [
  { text: "Control", gif: "/control.gif" },
  { text: "Customize", gif: "/customize.gif" },
  { text: "Deploy", gif: "/deploy.gif" },
  { text: "Scale", gif: "/scale.gif" },
  { text: "Automate", gif: "/automate.gif" },
  { text: "Optimize", gif: "/optimize.gif" },
  { text: "Orchestrate", gif: "/orchestrate.gif" },
  { text: "Supercharge", gif: "/supercharge.gif" },
];

// --------------------------------------
// 🔥 TEXT + GIF ANIMATION VARIANTS
// --------------------------------------
const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, filter: "blur(3px)" },
};

const gifVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8, rotate: 4 },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);

    return () => clearInterval(cycle);
  }, []);

  const current = WORDS[index];

  return (
    <section
      className="w-full h-screen bg-linear-to-b from-[#0f0f10] to-[#050505]
                 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 
                 pt-28 overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 text-white flex flex-col gap-6 select-none">

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight flex items-center gap-3 flex-wrap">
          Build AI You{" "}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.text}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center gap-3 text-transparent bg-clip-text 
                         bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500"
            >
              {current.text}

              {/* 🔥 GIF beside the word */}
              <motion.img
                src={current.gif}
                alt={current.text}
                className="w-15 h-15 md:w-15 md:h-15 rounded-md object-contain"
                variants={gifVariants}
              />
            </motion.div>
          </AnimatePresence>
        </h1>

        <p className="text-gray-300 text-lg max-w-lg">
          The next-generation AI Agent Builder that gives developers complete 
          control. Drag, build, test, export code — without touching complex AI plumbing.
        </p>

        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all">
            Build Agent
          </button>

          <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-gray-200 backdrop-blur-md hover:bg-white/10 transition-all">
            Explore Docs
          </button>
        </div>
      </div>

      {/* RIGHT SIDE – BIGGER SPLINE CANVAS */}
      <div
        className="w-full md:w-[48%] h-[420px] md:h-[600px]
                   m-10 md:mt-0 relative rounded-2xl overflow-hidden
                   bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-wtWjXpr84OS3CEMwORNAGko3/"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </section>
  );
}
