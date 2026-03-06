"use client";

import { CREDIT_USAGE } from "@/lib/payment-data";

const accentColors = [
  { bg: "rgba(192,44,42,0.07)", border: "rgba(192,44,42,0.15)" },
  { bg: "rgba(160,30,32,0.07)", border: "rgba(160,30,32,0.15)" },
  { bg: "rgba(115,15,17,0.07)", border: "rgba(115,15,17,0.15)" },
];

export default function CreditUsageTable() {
  return (
    <div
      className="w-full max-w-[980px] rounded-3xl overflow-hidden border-[1.5px] border-[rgba(192,44,42,0.12)] bg-white/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(192,44,42,0.07)] mb-8"
      style={{ WebkitBackdropFilter: "blur(24px)" }}
    >
      {/* Header */}
      <div
        className="px-7 py-5 border-b border-[rgba(192,44,42,0.1)]"
        style={{ background: "linear-gradient(135deg, rgba(192,44,42,0.04) 0%, rgba(255,255,255,0.2) 100%)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <div>
            <h3 className="text-[0.9rem] font-bold text-[#1A0A0A] leading-none">How Credits Work</h3>
            <p className="text-[0.72rem] text-[#7A5A5A] mt-0.5">Each AI action consumes credits from your balance</p>
          </div>
        </div>
      </div>

      {/* Usage cards */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CREDIT_USAGE.map((item, i) => {
          const colors = accentColors[i % accentColors.length];
          return (
            <div
              key={item.feature}
              className="rounded-2xl p-4 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{ background: colors.bg, borderColor: colors.border }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[0.72rem] font-bold"
                  style={{ background: "linear-gradient(135deg, #C02C2A, #730F11)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  {item.cost} {item.cost === 1 ? "credit" : "credits"}
                </div>
              </div>
              <div className="text-[0.85rem] font-bold text-[#1A0A0A] mb-1.5">{item.feature}</div>
              <p className="text-[0.73rem] text-[#7A5A5A] leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}