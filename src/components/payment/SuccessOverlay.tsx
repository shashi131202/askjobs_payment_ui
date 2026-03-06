"use client";

import { Plan } from "@/lib/payment-data";

interface SuccessOverlayProps {
  show: boolean;
  plan: Plan;
  onClose: () => void;
}

export default function SuccessOverlay({ show, plan, onClose }: SuccessOverlayProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center text-center px-8"
      style={{
        background: "#ffffff",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "fadeUp 0.4s ease",
      }}
    >
      {/* Check icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, #C02C2A, #730F11)",
          boxShadow: "0 12px 40px rgba(192,44,42,0.35)",
          animation: "bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-[2rem] font-extrabold tracking-[-1px] text-[#1A0A0A] mb-1">
        Credits Added! 🎉
      </h2>

      {/* Credit count */}
      <div
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-bold text-[1rem] mb-3"
        style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
        {plan.credits} Credits added to your account
      </div>

      <p className="text-[#7A5A5A] text-[0.9rem] max-w-sm mb-7">
        Your {plan.displayName} credits are ready to use. Start optimizing your resume, building cover letters, and practicing interviews right away.
      </p>

      <button
        onClick={onClose}
        className="px-8 py-3.5 text-white text-[0.9rem] font-bold rounded-xl border-none cursor-pointer
          transition-all duration-200 hover:-translate-y-px focus:outline-none"
        style={{
          fontFamily: "Inter, sans-serif",
          background: "linear-gradient(135deg, #C02C2A, #730F11)",
          boxShadow: "0 6px 24px rgba(192,44,42,0.35)",
        }}
      >
        Start Using Credits →
      </button>
    </div>
  );
}