"use client";

import React from "react";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Tweak knobs
  const RANGE = 350; // how many px of scroll for full transition
  const SEPARATION = 360; // how many px logo/nav move apart at full scroll

  // Map scroll to numeric x offsets (logo moves left -> negative, nav moves right -> positive)
  const logoXRaw = useTransform(scrollY, [0, RANGE], [0, -SEPARATION]);
  const navXRaw = useTransform(scrollY, [0, RANGE], [0, SEPARATION]);

  // Smooth with springs
  const springConfig = { damping: 28, stiffness: 150 };
  const logoX = useSpring(logoXRaw, springConfig);
  const navX = useSpring(navXRaw, springConfig);

  // Slight background blur growth mapped to scroll (optional)
  const blurRaw = useTransform(scrollY, [0, RANGE], [8, 20]);
  const blur = useSpring(blurRaw, { damping: 30, stiffness: 140 });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
      <div className="w-full h-24 flex items-center justify-center px-4">
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          {/* Centered group wrapper */}
          <div className="flex items-center gap-6">
            {/* LOGO + BRAND GROUP */}
            <motion.div
              style={{ x: logoX }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
  flex items-center gap-3 px-6 py-2
  bg-blue-800/20 backdrop-blur-2xl
  border border-white/15
  rounded-tr-2xl rounded-bl-2xl
  hover:rounded-tl-4xl hover:rounded-br-4xl
  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  relative overflow-hidden cursor-pointer
"

            >
              {/* Glass highlight / blur overlay */}
              <motion.div
                style={{ backdropFilter: blur, opacity: 0.22 }}
                className="absolute inset-0 bg-white/6 pointer-events-none"
              />

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -16 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.06, type: "spring", stiffness: 90, damping: 16 }}
                className="relative z-20"
              >
                <Image src="/vercel.svg" alt="Planaria" width={28} height={28} />
              </motion.div>

              {/* Brand */}
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.12, duration: 1.0 }}
                className="relative z-20 font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-200 to-blue-400"
              >
                Planaria
              </motion.span>
            </motion.div>

            {/* NAV GROUP */}
            <motion.div
              style={{ x: navX }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 1.0 }}
              className="relative flex items-center gap-4 px-4 py-2"
            >
              {/* Nav container (keeps leaf/rounded styles preserved) */}
              <div
  className="
    flex items-center gap-3 px-5 py-2
    bg-white/10 backdrop-blur-xl
    border border-white/10
    shadow-[0_8px_24px_rgba(0,0,0,0.25)]
    rounded-tr-2xl rounded-bl-2xl
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  "
>
  <NavItem label="Home" delay={0.16} />
  <NavItem label="Docs" delay={0.32} />
  <NavItem label="About" delay={0.58} />
  <NavPill label="Build Agent" delay={0.72} />
  <CallToAction label="Sign Up" delay={1.00} />
</div>

            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- SUB COMPONENTS (leaf-shaped preserved) ---------------- */

const NavItem = ({ label = "Item", delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay + 0.82, duration: 1.45, type: "spring", stiffness: 110, damping: 16 }}
className="
  text-gray-200 font-medium cursor-pointer
  px-3 py-1.5

"

    aria-label={label}
  >
    {label}
  </motion.button>
);

const NavPill = ({ label = "Pill", delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay + 1.02, duration: 1.45, type: "spring", stiffness: 120, damping: 16 }}
    className="
  text-gray-200 px-5 py-2 font-semibold
  rounded-tr-2xl rounded-bl-2xl
  shadow-[0_6px_20px_rgba(0,0,0,0.25)]
  hover:bg-white/10
  hover:rounded-tl-4xl hover:rounded-br-4xl
  border border-gray-300/30 cursor-pointer
  transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
  relative z-30
"

  >
    {label}
  </motion.button>
);

const CallToAction = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      delay: delay + 1.03,
      duration: 1.45,
      type: "spring",
      stiffness: 140,
      damping: 18
    }}
  >
    {/* When NOT logged in */}
    <SignedOut>
      <a
        href="/sign-in"
        className="
          text-white px-5 py-2 font-semibold
          bg-linear-to-br from-blue-400/30 via-blue-600/20 to-blue-800/30
          rounded-tr-2xl rounded-bl-2xl
          hover:rounded-tl-4xl hover:rounded-br-4xl
          hover:bg-linear-to-br hover:from-blue-300/40 hover:via-blue-500/30 hover:to-blue-700/40
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        "
      >
        Sign In
      </a>
    </SignedOut>

    {/* When logged in */}
    <SignedIn>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "shadow-xl rounded-full border border-white/20"
          }
        }}
      />
    </SignedIn>
  </motion.div>
);

