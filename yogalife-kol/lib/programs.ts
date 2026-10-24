import type { Program } from "./schemas";
// Design-system fixtures. These are not the studio's live timetable or availability.
export const samplePrograms: Program[] = [
  {
    id: 1,
    title: "Begin with gentle yoga",
    category: "Yoga",
    duration: 45,
    description: "A welcoming introduction to movement, breath and balance.",
  },
  {
    id: 2,
    title: "The art of slowing down",
    category: "Mindfulness",
    duration: 30,
    description: "Find a little stillness with a guided meditation practice.",
  },
  {
    id: 3,
    title: "Everyday Ayurvedic rituals",
    category: "Wellness",
    duration: 60,
    description:
      "Explore traditional practices for a more mindful daily rhythm.",
  },
  {
    id: 4,
    title: "Morning movement",
    category: "Yoga",
    duration: 40,
    description: "Make space for a gentle stretch and an unhurried start.",
  },
  {
    id: 5,
    title: "A moment to breathe",
    category: "Mindfulness",
    duration: 20,
    description: "An accessible introduction to awareness of your breath.",
  },
  {
    id: 6,
    title: "Rest and restore",
    category: "Wellness",
    duration: 50,
    description: "Build a calming evening routine with guided relaxation.",
  },
];
