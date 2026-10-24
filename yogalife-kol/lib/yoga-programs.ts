export const yogaPrograms = [
  {
    id: "general",
    title: "General yoga classes",
    category: "Everyday practice",
    description: "Make space for movement, breath and a little everyday balance.",
    detail: "Build a steady practice with guided yoga, mindful movement and breathwork. A welcoming starting point for beginners and a space to keep growing at your own pace.",
    tone: "cream",
  },
  {
    id: "private",
    title: "Private sessions",
    category: "Your own rhythm",
    description: "One-to-one guidance, with the time and attention you need.",
    detail: "Explore a personal yoga practice with dedicated one-to-one attention. Talk to our team about your experience, goals and preferred pace so we can help you find a suitable starting point.",
    tone: "sage",
  },
  {
    id: "training",
    title: "Teacher training (TTC)",
    category: "Learn & share",
    description: "Deepen your practice. Take the next step towards teaching.",
    detail: "Explore yoga teacher training through study, personal practice and teaching guidance. Ask our team about the curriculum, eligibility and upcoming dates for 200hr, 500hr and 1000hr TTC options.",
    tone: "white",
  },
  {
    id: "theory",
    title: "Theoretical classes",
    category: "Wisdom beyond the mat",
    description: "Connect your practice with the philosophy and traditions of yoga.",
    detail: "Make room to understand the ideas behind your practice. Explore yoga philosophy, traditional wisdom and the relationship between movement, breath and mindful living with guided learning.",
    tone: "cream",
  },
  {
    id: "workshops",
    title: "Workshops & seminars",
    category: "Come together",
    description: "Fresh perspectives and shared learning, one gathering at a time.",
    detail: "Join focused learning experiences around yoga, mindful living and holistic wellbeing. Our noticeboard lists published announcements and event dates; speak with our team about the next workshop.",
    tone: "sage",
  },
  {
    id: "consultation",
    title: "One-to-one consultations",
    category: "Begin with a conversation",
    description: "Thoughtful guidance for your goals, questions and everyday life.",
    detail: "A conversation about where you are and what you would like to explore. Our team can help you understand the available yoga and wellness options and find a next step that suits you.",
    tone: "sage",
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy yoga",
    category: "Move with care",
    description: "Guided movement with attention to posture and mobility.",
    detail: "Explore a considered approach to movement, with attention to posture, mobility and individual needs. Connect with our team to discuss the program and suitable guidance for your starting point.",
    tone: "white",
  },
  {
    id: "ayurveda",
    title: "Ayurvedic wellness",
    category: "Rooted in tradition",
    description: "Traditional Indian wisdom for a more mindful way of living.",
    detail: "Explore the Ayurvedic approach to daily routines and holistic wellbeing alongside yoga. Ask our team about consultations and available wellness experiences at Yogalife Kolkata.",
    tone: "cream",
  },
] as const;

export type YogaProgram = (typeof yogaPrograms)[number];
export type YogaProgramId = YogaProgram["id"];
