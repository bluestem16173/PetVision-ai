export type Power = {
  id: string;
  name: string;
  [key: string]: any; // Allow additional properties
};

export const POWER_TIERS: {
  free: Power[];
  basic: Power[];
  enhanced: Power[];
  pro: Power[];
} = {
  free: [
    // 3 items - placeholder powers
    { id: "power-1", name: "Power 1" },
    { id: "power-2", name: "Power 2" },
    { id: "power-3", name: "Power 3" },
  ],
  basic: [
    // 10 items - placeholder powers
    { id: "power-1", name: "Power 1" },
    { id: "power-2", name: "Power 2" },
    { id: "power-3", name: "Power 3" },
    { id: "power-4", name: "Power 4" },
    { id: "power-5", name: "Power 5" },
    { id: "power-6", name: "Power 6" },
    { id: "power-7", name: "Power 7" },
    { id: "power-8", name: "Power 8" },
    { id: "power-9", name: "Power 9" },
    { id: "power-10", name: "Power 10" },
  ],
  enhanced: [
    // 20 items - placeholder powers
    { id: "power-1", name: "Power 1" },
    { id: "power-2", name: "Power 2" },
    { id: "power-3", name: "Power 3" },
    { id: "power-4", name: "Power 4" },
    { id: "power-5", name: "Power 5" },
    { id: "power-6", name: "Power 6" },
    { id: "power-7", name: "Power 7" },
    { id: "power-8", name: "Power 8" },
    { id: "power-9", name: "Power 9" },
    { id: "power-10", name: "Power 10" },
    { id: "power-11", name: "Power 11" },
    { id: "power-12", name: "Power 12" },
    { id: "power-13", name: "Power 13" },
    { id: "power-14", name: "Power 14" },
    { id: "power-15", name: "Power 15" },
    { id: "power-16", name: "Power 16" },
    { id: "power-17", name: "Power 17" },
    { id: "power-18", name: "Power 18" },
    { id: "power-19", name: "Power 19" },
    { id: "power-20", name: "Power 20" },
  ],
  pro: Array.from({ length: 50 }, (_, i) => ({
    id: `power-${i + 1}`,
    name: `Power ${i + 1}`,
  })),
};

