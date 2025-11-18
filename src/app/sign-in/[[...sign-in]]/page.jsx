import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="
      min-h-screen w-full flex items-center justify-center
      bg-black
      bg-grid-white/[0.02]
    ">
      <div className="
        p-6 rounded-tr-3xl rounded-bl-3xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        animate-fadeIn
      ">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-500/50 hover:bg-blue-400/60 text-white rounded-tr-2xl rounded-bl-2xl px-4 py-2 transition-all",
              card:
                "bg-transparent shadow-none border-none",
              headerTitle:
                "text-white text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-200 to-blue-400",
              headerSubtitle:
                "text-gray-300",
              socialButton:
                "rounded-tr-2xl rounded-bl-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all",
              socialButtonsBlockButton:
                "rounded-tr-2xl rounded-bl-2xl bg-white/10 border border-white/10 text-white transition-all",
              formFieldInput:
                "bg-black/40 border border-white/20 text-white placeholder:text-gray-400 rounded-xl",
              formFieldLabel:
                "text-gray-300 font-medium",
              footer:
                "text-gray-400",
            },
          }}
        />
      </div>
    </div>
  );
}
