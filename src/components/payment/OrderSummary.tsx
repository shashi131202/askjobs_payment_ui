"use client";

import { Plan } from "@/lib/payment-data";

interface OrderSummaryProps {
  plan: Plan;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function OrderSummary({ plan, isLoading, onSubmit }: OrderSummaryProps) {
  const creditBarPct = Math.min((plan.credits / 50) * 100, 100);

  return (
    <div
      className="p-8 flex flex-col"
      style={{ background: "linear-gradient(160deg, rgba(192,44,42,0.03) 0%, rgba(255,255,255,0.3) 100%)" }}
    >
      {/* Section title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#7A5A5A] whitespace-nowrap">
          Order Summary
        </span>
        <div className="flex-1 h-px bg-[rgba(192,44,42,0.1)]" />
      </div>

      {/* Selected plan badge */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[rgba(192,44,42,0.12)] mb-5 shadow-[0_4px_16px_rgba(192,44,42,0.06)]">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)", boxShadow: "0 4px 12px rgba(192,44,42,0.3)" }}
        >
          {plan.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[0.9rem] font-bold text-[#1A0A0A]">{plan.displayName}</div>
          <div className="text-[0.72rem] text-[#7A5A5A] mt-0.5">
            {plan.credits} AI Credits · ₹{plan.pricePerCredit % 1 === 0 ? plan.pricePerCredit : plan.pricePerCredit.toFixed(2)}/credit
          </div>
        </div>
        {plan.badge && (
          <span
            className="text-[9px] font-bold tracking-widest uppercase text-white px-2 py-1 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)" }}
          >
            {plan.badge}
          </span>
        )}
      </div>

      {/* Credit bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[0.72rem] text-[#7A5A5A] font-medium">Credits you&apos;ll receive</span>
          <span className="text-[0.72rem] font-bold text-[#C02C2A]">{plan.credits} / 50</span>
        </div>
        <div className="w-full h-2 bg-[rgba(192,44,42,0.1)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${creditBarPct}%`, background: "linear-gradient(90deg, #C02C2A, #730F11)" }}
          />
        </div>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex justify-between items-center text-[0.82rem]">
          <span className="text-[#7A5A5A]">{plan.displayName}</span>
          <span className="font-semibold text-[#1A0A0A]">₹{plan.price}.00</span>
        </div>
      </div>

      <div className="h-px bg-[rgba(192,44,42,0.1)] mb-4" />

      {/* Total */}
      <div className="flex justify-between items-baseline mb-6">
        <span className="text-[0.85rem] font-semibold text-[#1A0A0A]">Total</span>
        <span
          className="text-[1.8rem] font-extrabold tracking-[-1.5px]"
          style={{
            background: "linear-gradient(135deg, #C02C2A, #730F11)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ₹{plan.price}
        </span>
      </div>

      {/* What you unlock */}
      <div
        className="rounded-xl p-4 mb-5 border border-[rgba(192,44,42,0.1)]"
        style={{ background: "rgba(192,44,42,0.04)" }}
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-widest text-[#7A5A5A] mb-2.5">
          You&apos;ll unlock
        </div>
        <div className="flex flex-col gap-2">
          {[
            { icon: "✨", label: "Resume Optimization", uses: `${plan.credits} uses` },
            { icon: "📄", label: "Resume Builder", uses: `${Math.floor(plan.credits / 2)} uses` },
            { icon: "🎤", label: "AI Mock Interview", uses: `${Math.floor(plan.credits / 5)} uses` },
          ].map(({ icon, label, uses }) => (
            <div key={label} className="flex items-center justify-between text-[0.75rem]">
              <span className="flex items-center gap-1.5 text-[#1A0A0A]">
                <span>{icon}</span>
                {label}
              </span>
              <span className="font-semibold text-[#C02C2A]">{uses}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pay CTA */}
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="relative w-full py-4 px-6 flex items-center justify-center gap-2
          text-white text-[0.95rem] font-bold rounded-xl border-none cursor-pointer overflow-hidden
          transition-all duration-200
          hover:-translate-y-px hover:shadow-[0_10px_32px_rgba(192,44,42,0.4)]
          active:translate-y-0 disabled:pointer-events-none
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C02C2A] focus-visible:ring-offset-2"
        style={{ background: "linear-gradient(135deg, #C02C2A 0%, #730F11 100%)", boxShadow: "0 6px 24px rgba(192,44,42,0.35)" }}
      >
        {isLoading && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", animation: "shimmer 1.2s infinite" }}
          />
        )}
        {!isLoading && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        )}
        {isLoading ? "Processing..." : `Pay ₹${plan.price} · Get ${plan.credits} Credits`}
      </button>
    </div>
  );
}
