"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { PLANS, Plan, PlanId } from "@/lib/payment-data";
import PlanCard from "@/components/payment/PlanCard";
import CreditUsageTable from "@/components/payment/CreditUsageTable";
import SuccessOverlay from "@/components/payment/SuccessOverlay";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export default function PaymentPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("growth");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paidPlan, setPaidPlan] = useState<Plan | null>(null);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId)!;

  const handleSelectPlan = useCallback((id: PlanId) => {
    setSelectedPlanId(id);
  }, []);

  const handlePay = useCallback((plan: Plan) => {
    setSelectedPlanId(plan.id);
    setIsLoading(true);
    // Replace this setTimeout with your actual Razorpay / Stripe payment call
    setTimeout(() => {
      setIsLoading(false);
      setPaidPlan(plan);
      setShowSuccess(true);
    }, 2200);
  }, []);

  return (
    <div
      className={`${inter.variable} font-[Inter,sans-serif] min-h-screen text-[#1A0A0A] overflow-x-hidden relative`}
      style={{ background: "#ffffff" }}
    >
      {/* Ambient radial background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 80% 5%,  rgba(192,44,42,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 45% 45% at 10% 85%, rgba(192,44,42,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 35% 35% at 50% 50%, rgba(255,255,255,0.45) 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,44,42,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,44,42,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 h-[60px] flex items-center justify-between border-b border-[rgba(192,44,42,0.14)]"
        style={{ background: "#ffffff", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <Image
          src="/askjobs_logo.png"
          alt="AskJobs Logo"
          width={140}
          height={40}
          priority
          className="object-contain"
        />
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-[0.8rem] font-medium text-[#7A5A5A] no-underline transition-colors duration-200 hover:text-[#C02C2A]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </nav>

      {/* Page content */}
      <div className="relative z-10 min-h-screen pt-20 pb-14 px-4 sm:px-6 flex flex-col items-center">

        {/* Top pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-[0.35rem] rounded-full border border-[rgba(192,44,42,0.2)] bg-[rgba(192,44,42,0.08)] text-[#C02C2A] text-[0.7rem] font-semibold tracking-[0.1em] uppercase mt-2 mb-5"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C02C2A]" style={{ animation: "pulse 1.5s ease infinite" }} />
          Top up your credits
        </div>

        {/* Headline */}
        <div className="text-center mb-2" style={{ animation: "fadeUp 0.5s 0.05s ease both" }}>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-1.5px] leading-[1.1] text-[#1A0A0A]">
            Choose Your{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #C02C2A 0%, #730F11 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Credit Pack
            </em>
          </h1>
          <p className="mt-2 text-[0.92rem] text-[#7A5A5A] font-normal">
            One-time purchase · No subscriptions · Credits never expire
          </p>
        </div>

        {/* Plans Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full max-w-[980px] mt-8 mb-8"
          style={{ animation: "fadeUp 0.5s 0.1s ease both" }}
        >
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              isLoading={isLoading}
              onSelect={handleSelectPlan}
              onPay={handlePay}
            />
          ))}
        </div>

        {/* Credit Usage Table */}
        <div className="w-full max-w-[980px]" style={{ animation: "fadeUp 0.5s 0.15s ease both" }}>
          <CreditUsageTable />
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-5 mt-4"
          style={{ animation: "fadeUp 0.5s 0.2s ease both" }}
        >
          {[
            // { icon: "🔒", label: "Secured by Razorpay" },
            { icon: "⏱️", label: "Credits never expire" },
            { icon: "⚡", label: "Instant top-up" },
            { icon: "👥", label: "50,000+ users trust AskJobs" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[0.72rem] text-[#7A5A5A] font-medium">
              <span>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Success overlay */}
      <SuccessOverlay
        show={showSuccess}
        plan={paidPlan ?? selectedPlan}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
