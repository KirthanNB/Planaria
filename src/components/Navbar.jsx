"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// Create browser client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Navbar() {
  // Auth state
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const initializeAuth = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setUserProfile(profile);
    }
  }, []);

  useEffect(() => {
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [initializeAuth]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-xl border-b border-white/10" />
      
      <div className="relative w-full h-24 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl flex items-center justify-between">
          
          {/* LOGO GROUP */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              flex items-center gap-3 px-6 py-3
              bg-blue-900/20 backdrop-blur-2xl
              border border-white/15
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transition-all duration-300
              group
              rounded-tr-2xl rounded-bl-2xl
              hover:rounded-tl-2xl hover:rounded-br-2xl hover:rounded-tr-lg hover:rounded-bl-lg
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]
              hover:bg-blue-900/25
            "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Image 
                src="/vercel.svg" 
                alt="Planaria" 
                width={28} 
                height={28}
                priority
              />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="
                font-extrabold text-2xl
                bg-clip-text text-transparent
                bg-linear-to-r from-blue-300 via-sky-200 to-blue-400
              "
            >
              Planaria
            </motion.span>
          </motion.div>

          {/* NAV GROUP */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="
              flex items-center gap-4 px-6 py-3
              bg-white/10 backdrop-blur-xl
              border border-white/10
              shadow-[0_8px_24px_rgba(0,0,0,0.25)]
              rounded-tr-2xl rounded-bl-2xl
              transition-all duration-300
            ">
              <NavItem label="Home" href="/" index={0} />
              <NavItem label="Docs" href="/docs" index={1} />
              <NavItem label="About" href="/about" index={2} />
              <NavPill label="Build Agent" href="/agents" />

              {/* Single Sign Up Button */}
              {!user ? (
                <SignUpButton />
              ) : (
                <UserAvatar 
                  user={user} 
                  profile={userProfile}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </nav>
  );
}

/* SUB COMPONENTS */

const NavItem = React.memo(({ label, href, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
    whileHover={{ y: -2 }}
    className="cursor-pointer"
  >
    <Link href={href} className="
      text-gray-200 font-medium px-4 py-2
      hover:text-white
      transition-colors duration-200
      relative
    ">
      {label}
      <motion.div
        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400"
        whileHover={{ 
          width: "80%", 
          x: "-40%",
          transition: { duration: 0.3 }
        }}
      />
    </Link>
  </motion.div>
));

NavItem.displayName = 'NavItem';

const NavPill = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.6, duration: 0.4 }}
  >
    <Link
      href="/agents"
      className="
        text-gray-200 px-5 py-2 font-semibold
        rounded-tr-2xl rounded-bl-2xl
        border border-gray-300/30
        shadow-[0_6px_20px_rgba(0,0,0,0.25)]
        hover:bg-white/10
        transition-all duration-300
        block
        hover:rounded-tl-2xl hover:rounded-br-2xl hover:rounded-tr-lg hover:rounded-bl-lg
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.35)]
      "
    >
      Build Agent
    </Link>
  </motion.div>
));

NavPill.displayName = 'NavPill';

const SignUpButton = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7, duration: 0.4 }}
  >
    <Link
      href="/auth/login"
      className="
        text-white px-5 py-2 font-semibold
        bg-linear-to-br from-blue-400/40 via-blue-500/30 to-blue-800/40
        border border-blue-400/30
        rounded-tr-2xl rounded-bl-2xl
        hover:bg-linear-to-br hover:from-blue-300/50 hover:via-blue-500/40 hover:to-blue-700/50
        transition-all duration-300
        block
        hover:rounded-tl-2xl hover:rounded-br-2xl hover:rounded-tr-lg hover:rounded-bl-lg
        hover:shadow-[0_8px_25px_rgba(59,130,246,0.2)]
        hover:border-blue-300/40
      "
    >
      Login
    </Link>
  </motion.div>
));

SignUpButton.displayName = 'SignUpButton';

const UserAvatar = React.memo(({ user, profile, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || 'U';
  };

  const getUserName = () => {
    return profile?.full_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.4 }}
    >
      <motion.button
        whileHover={{ y: -2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-3 px-4 py-2
          bg-white/10 backdrop-blur-xl
          border border-white/10
          rounded-tr-2xl rounded-bl-2xl
          hover:bg-white/15
          transition-all duration-300
          hover:rounded-tl-2xl hover:rounded-br-2xl hover:rounded-tr-lg hover:rounded-bl-lg
          hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]
        "
      >
        <div className="
          w-8 h-8 rounded-full
          bg-linear-to-br from-blue-500 to-purple-600
          flex items-center justify-center
          text-white font-semibold text-sm
          border border-white/20
          shadow-lg
        ">
          {getUserInitials()}
        </div>

        <span className="text-white font-medium text-sm">
          {getUserName()}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/60 text-xs"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      {isOpen && (
        <div className="
          absolute top-full right-0 mt-2 w-48
          bg-slate-800/95 backdrop-blur-xl
          border border-white/10
          rounded-tr-2xl rounded-bl-2xl
          shadow-2xl
          overflow-hidden
          z-50
        ">
          <div className="p-2">
            <Link
              href="/profile"
              className="
                flex items-center gap-3 px-3 py-2
                text-gray-200 hover:text-white
                hover:bg-white/5
                rounded-lg
                transition-all duration-200
                text-sm
                block
              "
              onClick={() => setIsOpen(false)}
            >
              👤 Profile
            </Link>
            <Link
              href="/dashboard"
              className="
                flex items-center gap-3 px-3 py-2
                text-gray-200 hover:text-white
                hover:bg-white/5
                rounded-lg
                transition-all duration-200
                text-sm
                block
              "
              onClick={() => setIsOpen(false)}
            >
              🛠️ Dashboard
            </Link>
            
            <div className="h-px bg-white/10 my-1" />
            
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="
                w-full text-left px-3 py-2
                text-red-300 hover:text-red-100
                rounded-lg
                transition-all duration-200
                flex items-center gap-3 text-sm
                hover:bg-red-500/10
              "
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
});

UserAvatar.displayName = 'UserAvatar';