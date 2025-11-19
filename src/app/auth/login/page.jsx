"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

// Floating bluish leaves
const Leaf = ({ size, x, y, delay, rotate }) => (
  <motion.div
    className="absolute bg-blue-600/40 rounded-full"
    style={{ width: size, height: size, top: y, left: x, rotate }}
    animate={{ y: ["0%", "80%"] }}
    transition={{
      repeat: Infinity,
      duration: 15 + Math.random() * 10,
      delay,
      ease: "linear",
    }}
  />
);

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isSignIn) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message);
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) setError(signUpError.message);
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (oauthError) setError(oauthError.message);
  };

  // -------------------------------
  // Auth Form Component
  // -------------------------------
  const AuthForm = () => (
    <motion.div
      key={isSignIn ? "signin-form" : "signup-form"}
      initial={{ opacity: 0, x: isSignIn ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isSignIn ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md flex flex-col gap-4 relative z-10"
    >
      {/* Toggle */}
      <div className="flex gap-2 w-full mb-6 relative">
        <motion.div
          layout
          className="absolute h-full w-1/2 bg-blue-500/50 rounded-tr-2xl rounded-bl-2xl
              hover:rounded-tl-3xl hover:rounded-br-3xl hover:rounded-tr-lg hover:rounded-bl-lg"
          style={{ left: isSignIn ? "50%" : "0" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => setIsSignIn(false)}
          className="flex-1 py-3 font-semibold relative z-20 text-center text-white"
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsSignIn(true)}
          className="flex-1 py-3 font-semibold relative z-20 text-center text-white"
        >
          Sign In
        </button>
      </div>

      {/* Card */}
      <motion.div
        key={isSignIn ? "signin-card" : "signup-card"}
        className="
          bg-linear-to-br from-black/40 via-blue-900/20 to-black/20
          border border-white/20 backdrop-blur-xl p-6
          rounded-[40px_10px_40px_10px] hover:rounded-[10px_40px_10px_40px]
          shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300
          flex flex-col gap-4
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white text-center">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-400 text-center">
          {isSignIn ? "Sign in to your account" : "Join us today"}
        </p>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="
            w-full flex items-center justify-center gap-2 py-2 mt-2
           bg-gray-100/30 text-white
            rounded-[30px_10px_30px_10px] hover:rounded-[10px_30px_10px_30px]
            transition-all duration-300 shadow-md hover:bg-blue-600
          "
        >
          <Image
            src="/gooogle.png"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5 rounded-full"
          />
          <span className="font-semibold text-sm">Continue with Google</span>
        </button>

        {/* Inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/20
            rounded-[20px_10px_20px_10px] hover:rounded-[10px_20px_10px_20px]
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
          "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full px-4 py-2 bg-black/30 text-white placeholder-gray-400 border border-white/20
            rounded-[20px_10px_20px_10px] hover:rounded-[10px_20px_10px_20px]
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
          "
        />

        {error && (
          <AnimatePresence>
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm bg-red-400/10 p-2 rounded-lg border border-red-400/20"
            >
              {error}
            </motion.p>
          </AnimatePresence>
        )}

        {/* Auth button */}
        <button
          onClick={handleAuth}
          disabled={isLoading}
          className="
            w-full py-2 mt-2 font-semibold text-white bg-blue-900/40
            rounded-[20px_10px_20px_10px] hover:rounded-[10px_20px_10px_20px]
            shadow-md transition-all duration-300
          "
        >
          {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {/* Switch */}
        <p className="text-gray-300 text-sm text-center mt-2">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsSignIn(!isSignIn)} className="underline font-semibold">
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );

  // -------------------------------
  // Visual Side with Spline iframe
  // -------------------------------
  const VisualSide = () => (
    <motion.div
      key={isSignIn ? "signin-visual" : "signup-visual"}
      className="flex-1 relative h-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: isSignIn ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isSignIn ? -100 : 100 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
        <iframe src='https://my.spline.design/genkubgreetingrobot-EEtfz9QnMVsFnHrJpzVS3oaR/' frameborder='0' width='100%' height='100%'></iframe>
      </div>

      {/* Floating bluish leaves */}
      <Leaf size={30} x="10%" y="15%" delay={0} rotate={10} />
      <Leaf size={25} x="75%" y="10%" delay={2} rotate={-15} />
      <Leaf size={40} x="60%" y="55%" delay={1} rotate={5} />
      <Leaf size={20} x="20%" y="70%" delay={3} rotate={-10} />
    </motion.div>
  );

  return (
    <div className="h-screen flex pt-16 bg-black overflow-hidden">
      {!isSignIn && <VisualSide />}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <AuthForm />
      </div>
      {isSignIn && <VisualSide />}
    </div>
  );
}
