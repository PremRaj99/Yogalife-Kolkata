export const naturopathyTherapies = [
  { id: "hydrotherapy", title: "Hydrotherapy", category: "Water", description: "Water-based treatments to improve circulation, relax muscles and cleanse the body.", tone: "sage" },
  { id: "mud", title: "Mud therapy", category: "Earth", description: "Natural mud application to reduce inflammation, soothe skin and aid detox.", tone: "cream" },
  { id: "herbal-bath", title: "Herbal bath", category: "Warmth", description: "Warm herbal baths to relax muscles, improve blood flow and ease joint pain.", tone: "white" },
  { id: "nutrition", title: "Nutrition guidance", category: "Nourish", description: "Personalised natural diet plans to support digestion, immunity and wellness.", tone: "sage" },
  { id: "acupressure", title: "Acupressure", category: "Touch", description: "Pressure-based therapy to relieve pain, balance energy and support healing.", tone: "cream" },
  { id: "herbal-remedies", title: "Herbal remedies", category: "Plant wisdom", description: "Plant-based remedies to restore balance and strengthen natural immunity.", tone: "white" },
] as const;

export type NaturopathyTherapy = (typeof naturopathyTherapies)[number];
