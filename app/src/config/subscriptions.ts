import { PlanId, PowerTierId } from "../types/api";



// For now, hardcode the current plan. Later this comes from auth/subscription.

export const CURRENT_PLAN: PlanId = "free";



export const PLAN_LABELS: Record<PlanId, string> = {

  free: "Free",

  basic: "Basic",

  enhanced: "Enhanced",

  pro: "Pro",

};



// Which power tiers each plan is allowed to use

export const PLAN_ACCESS: Record<PlanId, PowerTierId[]> = {

  free: ["free"],

  basic: ["free", "basic"],

  enhanced: ["free", "basic", "enhanced"],

  pro: ["free", "basic", "enhanced", "pro"],

};

