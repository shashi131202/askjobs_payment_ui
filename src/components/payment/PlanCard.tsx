"use client";

import { Plan, PlanId } from "@/lib/payment-data";

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: (id: PlanId) => void;
  onPay: (plan: Plan) => void;
}

export default function PlanCard({ plan, isSelected, isLoading, onSelect, onPay }: PlanCardProps) {
  const isFree = plan.id === "Free";

  return (
    <div
      onClick={() => !isFree && onSelect(plan.id)}
      className={`relative rounded-[20px] p-6 overflow-hidden transition-all duration-300 flex flex-col bg-white/85 backdrop-blur-xl
        ${isFree
          ? "border-[1.5px] border-[rgba(192,44,42,0.12)] cursor-default"
          : isSelected
            ? "border-[1.5px] border-[#C02C2A] shadow-[0_0_0_3px_rgba(192,44,42,0.12),0_20px_60px_rgba(192,44,42,0.15)] -translate-y-1 cursor-pointer"
            : "border-[1.5px] border-[rgba(192,44,42,0.12)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(192,44,42,0.12)] cursor-pointer"
        }`}
      style={{ WebkitBackdropFilter: "blur(20px)" }}
    >
      {/* Selected gradient overlay */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[20px]"
          style={{ background: "linear-gradient(135deg, rgba(192,44,42,0.04) 0%, transparent 60%)" }}
        />
      )}

      {/* Top badges row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${plan.popular ? "shadow-[0_6px_20px_rgba(192,44,42,0.35)]" : ""}`}
          style={{
            background: plan.popular
              ? "linear-gradient(135deg, #C02C2A, #730F11)"
              : plan.id === "pro"
              ? "rgba(115,15,17,0.08)"
              : "rgba(192,44,42,0.08)",
          }}
        >
          {plan.icon}
        </div>

        <div className="flex flex-col items-end gap-2">
          {isFree ? (
            <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-[rgba(192,44,42,0.25)] text-[#C02C2A] bg-[rgba(192,44,42,0.06)]">
              Current Plan
            </span>
          ) : plan.badge ? (
            <span
              className="text-[9px] font-bold tracking-widest uppercase text-white px-2.5 py-1 rounded-full"
              style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)" }}
            >
              {plan.badge}
            </span>
          ) : null}

          {!isFree && (
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isSelected ? "bg-[#C02C2A] border-[#C02C2A]" : "bg-white border-[rgba(192,44,42,0.25)]"
              }`}
            >
              {isSelected && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
            </div>
          )}
        </div>
      </div>

      {/* Plan name */}
      <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#7A5A5A] mb-1">
        {plan.name}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        {isFree ? (
          <span className="text-[2.6rem] font-extrabold text-[#1A0A0A] leading-none tracking-[-2px]">Free</span>
        ) : (
          <>
            <span className="text-[1.1rem] font-semibold text-[#1A0A0A]">₹</span>
            <span className="text-[2.6rem] font-extrabold text-[#1A0A0A] leading-none tracking-[-2px]">{plan.price}</span>
          </>
        )}
      </div>

      {/* Credits pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[0.75rem] font-bold w-fit transition-all duration-200"
        style={{
          background: isSelected && !isFree ? "linear-gradient(135deg, #C02C2A, #730F11)" : "rgba(192,44,42,0.08)",
          color: isSelected && !isFree ? "white" : "#C02C2A",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
        {plan.credits} Credits
      </div>

      {/* Per-credit cost */}
      {!isFree && (
        <p className="text-[0.7rem] text-[#7A5A5A] mb-3">
          ₹{plan.pricePerCredit % 1 === 0 ? plan.pricePerCredit : plan.pricePerCredit.toFixed(2)} per credit
        </p>
      )}

      {/* Description */}
      <p className="text-[0.78rem] text-[#7A5A5A] leading-relaxed mb-5 flex-1">
        {plan.description}
      </p>

      {/* CTA */}
      {isFree ? (
        <div className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-[0.82rem] font-semibold border border-[rgba(192,44,42,0.2)] text-[#7A5A5A] bg-[rgba(192,44,42,0.04)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Active Plan
        </div>
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(plan.id); onPay(plan); }}
          disabled={isLoading}
          className="relative w-full py-3 px-4 flex items-center justify-center gap-2
            text-white text-[0.85rem] font-bold rounded-xl border-none cursor-pointer overflow-hidden
            transition-all duration-200
            hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(192,44,42,0.4)]
            active:translate-y-0 disabled:pointer-events-none disabled:opacity-70
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C02C2A] focus-visible:ring-offset-2"
          style={{ background: "linear-gradient(135deg, #C02C2A 0%, #730F11 100%)", boxShadow: "0 4px 16px rgba(192,44,42,0.3)" }}
        >
          {isLoading && isSelected && (
            <span
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", animation: "shimmer 1.2s infinite" }}
            />
          )}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          {isLoading && isSelected ? "Processing..." : `Upgrade `}
        </button>
      )}
    </div>
  );
}
