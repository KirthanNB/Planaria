"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full h-20 z-50
        flex items-center justify-between
        px-8 backdrop-blur-md -backdrop-brightness-50
      "
    >
      {/* ================= LOGO + BRAND NAME ================= */}
      <div
        className="
          flex items-center gap-3 px-4 py-2
          bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80
          border border-white/10 rounded-tr-2xl rounded-bl-2xl
          shadow-[0_8px_24px_rgba(0,0,0,0.25)]
          select-none relative overflow-hidden
        "
      >
        {/* Glass Highlight */}
        <div className="absolute inset-0 bg-white/10 opacity-20 blur-xl pointer-events-none" />

        {/* ---------- Vercel Logo ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={24}
            height={24}
            className="relative z-10"
          />
        </motion.div>

        {/* ---------- Brand Name ---------- */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            font-extrabold tracking-tight text-2xl
            bg-linear-to-r from-blue-300 via-blue-100 to-sky-300 
            bg-clip-text text-transparent
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]
            relative z-10
          "
        >
          Planaria
        </motion.span>
      </div>

      {/* ================= NAV MENU ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="
          relative flex items-center gap-6 px-8 py-3
          bg-white/10 border border-white/20
          rounded-tr-2xl rounded-bl-2xl shadow-lg backdrop-blur-2xl 
          transition-all duration-300 w-fit 
        "
      >
        {/* Soft Light */}
        <div className="absolute inset-0 rounded-tr-2xl rounded-bl-2xl bg-linear-to-br from-white/20 to-white/5 opacity-30 pointer-events-none" />

        <NavItem label="Home" />
        <NavItem label="Docs" />
        <NavItem label="About" />
        <NavPill label="Build Agent" />
        <CallToAction label="Sign Up" />
      </motion.div>
    </nav>
  );
};

export default Navbar;

/* -------------------------- Sub Components -------------------------- */

const NavItem = ({ label }) => (
  <span
    className="
      text-gray-200 font-medium cursor-pointer
      transition-all duration-300 hover:rounded-br-4xl hover:rounded-tl-4xl
      relative z-10
    "
  >
    {label}
  </span>
);

const NavPill = ({ label }) => (
  <span
    className="
      text-gray-200 px-4 py-1.5 rounded-tr-2xl rounded-bl-2xl border border-white/20
      cursor-pointer transition-all duration-300 
      hover:rounded-br-4xl hover:rounded-tl-4xl
      relative z-10
    "
  >
    {label}
  </span>
);

const CallToAction = ({ label }) => (
  <span
    className="
      bg-blue-600 text-white px-5 py-2 rounded-tr-2xl rounded-bl-2xl ml-2
      shadow-lg shadow-blue-500/20 cursor-pointer
      transition-all duration-300 hover:bg-blue-500 
      hover:rounded-br-4xl hover:rounded-tl-4xl
      relative z-10
    "
  >
    {label}
  </span>
);
