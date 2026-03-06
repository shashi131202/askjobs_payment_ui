// ── Types ──────────────────────────────────────────────────────────────────

export type PlanId = "Free" | "basic" | "growth" | "pro";

export interface Plan {
  id: PlanId;
  icon: string;
  name: string;
  displayName: string;
  price: number;
  credits: number;
  pricePerCredit: number;
  description: string;
  popular: boolean;
  badge?: string;
}

export interface CreditUsage {
  icon: string;
  feature: string;
  cost: number;
  description: string;
}

// ── Plans ──────────────────────────────────────────────────────────────────

export const PLANS: Plan[] = [
  {
    id: "Free",
    icon: "🌱",
    name: "Free",
    displayName: "Free Pack",
    price: 0,
    credits: 20,
    pricePerCredit: 1,
    description: "You are currently subscribed to the Free plan with limited feature access.",
    popular: false,
  },
  {
    id: "basic",
    icon: " 🌟",
    name: "Basic",
    displayName: "Basic Pack",
    price: 49,
    credits: 10,
    pricePerCredit: 5,
    description: "Perfect for trying out AskJobs AI tools. Great for a quick application sprint.",
    popular: false,
  },
  {
    id: "growth",
    icon: "🚀",
    name: "Growth",
    displayName: "Growth Pack",
    price: 99,
    credits: 25,
    pricePerCredit: 4,
    description: "Best value for active job seekers. More credits, lower cost per use.",
    popular: true,
    badge: "Best Value",
  },
  {
    id: "pro",
    icon: "🏆",
    name: "Pro",
    displayName: "Pro Pack",
    price: 199,
    credits: 75,
    pricePerCredit: 2.65,
    description: "For power users going all-in on their job search. Maximum credits, lowest cost.",
    popular: false,
    badge: "Most Credits",
  },
];

// ── Credit Usage ───────────────────────────────────────────────────────────

export const CREDIT_USAGE: CreditUsage[] = [
  {
    icon: "✨",
    feature: "Resume Optimization",
    cost: 1,
    description:
      "AI scans your resume against a job description, returns an ATS score, keyword gaps, and sentence-level rewrite suggestions.",
  },
  {
    icon: "📄",
    feature: "Resume Builder",
    cost: 1,
    description:
      "Build a complete ATS-friendly resume from scratch with AI-generated bullet points, smart formatting, and one-click PDF export.",
  },
  {
    icon: "🎤",
    feature: "AI Mock Interview",
    cost: 2,
    description:
      "Full role-specific interview simulation with instant STAR-method scoring, model answers, and a confidence improvement tracker.",
  },
];