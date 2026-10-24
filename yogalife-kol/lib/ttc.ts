// Teacher training course content. Each entry renders one page at /ttc/[level].
export type TtcCourse = {
  level: string;
  hours: string;
  title: string;
  tagline: string;
  intro: string[];
  image: string;
  imageAlt: string;
  sections: { title: string; items: string[] }[];
  highlightsTitle: string;
  highlights: string[];
  prerequisites: string[];
};

export const ttcCourses: TtcCourse[] = [
  {
    level: "200hr",
    hours: "200",
    title: "200hr Yoga Teacher Training",
    tagline: "Root your own practice, learn to hold space for others, and take your first steps as a yoga teacher.",
    intro: [
      "Our 200hr TTC is a foundation course for sincere practitioners who want to understand yoga beyond the poses. You study asana, breath and philosophy the way they are taught in the Indian tradition, guided closely by experienced teachers.",
      "By the end of the course you can plan and lead a safe, well-structured group class, explain what you teach, and keep growing your own daily practice.",
    ],
    image: "/images/new/Watercolor Yoga Class with Botanical Calm.png",
    imageAlt: "Illustration of a yoga teacher guiding a class",
    sections: [
      {
        title: "What you will learn",
        items: [
          "Correct alignment and safe modifications for core asanas",
          "Pranayama, bandhas and guided meditation",
          "Foundations of yoga philosophy, including the Yoga Sutras and Bhagavad Gita",
          "Functional anatomy for yoga teachers",
          "Class planning, sequencing and clear verbal cueing",
        ],
      },
      {
        title: "How the course runs",
        items: [
          "Daily practice, theory and teaching labs",
          "Supervised practice teaching with feedback",
          "Written and practical assessment at the end",
          "Ask our team about current batch dates and timings",
        ],
      },
    ],
    highlightsTitle: "Course highlights",
    highlights: [
      "Asana & alignment",
      "Pranayama & meditation",
      "Anatomy & physiology",
      "Yoga philosophy",
      "Sanskrit basics",
      "Mantra & chanting",
      "Ayurveda for daily life",
      "Teaching methodology",
      "Ethics of a yoga teacher",
      "Practice teaching",
    ],
    prerequisites: [
      "A regular personal practice and a real interest in learning",
      "Good general health, or clearance from your doctor",
      "A short conversation with our team before you enrol",
    ],
  },
  {
    level: "500hr",
    hours: "500",
    title: "500hr Yoga Teacher Training",
    tagline: "Deepen what you know, refine how you teach, and learn to work with yoga as a therapeutic practice.",
    intro: [
      "The 500hr TTC builds on a 200hr foundation. It is for teachers who want greater depth in anatomy, therapeutic application and the subtler practices of yoga.",
      "You learn to observe each student closely, adapt practices for different bodies and conditions, and draw on Ayurveda and naturopathy alongside yoga.",
    ],
    image: "/images/new/Guided Seated Forward Fold in a Serene Yoga Garden.png",
    imageAlt: "Illustration of yoga study and philosophy",
    sections: [
      {
        title: "What you will learn",
        items: [
          "Advanced asana, adjustments and hands-on assisting",
          "Yoga therapy approaches for common conditions",
          "Deeper study of pranayama, mudra and meditation",
          "Classical texts and their place in everyday practice",
          "Ayurveda and naturopathy in a holistic wellness plan",
        ],
      },
      {
        title: "How the course runs",
        items: [
          "Intensive modules combined with mentored teaching",
          "Case observations alongside our therapists",
          "Teaching practicum with detailed feedback",
          "Ask our team about current batch dates and formats",
        ],
      },
    ],
    highlightsTitle: "Course highlights",
    highlights: [
      "Advanced anatomy & kinesiology",
      "Yoga therapeutics",
      "Assisting & adjusting",
      "Cueing & sequencing",
      "Ayurveda & naturopathy",
      "Pranayama, mudra & meditation",
      "Yoga texts & philosophy",
      "Accessibility & inclusive teaching",
    ],
    prerequisites: [
      "A completed 200hr yoga teacher training",
      "Some teaching experience is helpful",
      "A conversation with our team to discuss your goals",
    ],
  },
  {
    level: "1000hr",
    hours: "1000",
    title: "1000hr Yoga Teacher Training",
    tagline: "A long, mentored study of yoga therapy and the traditional sciences, for teachers ready to guide others one to one.",
    intro: [
      "The 1000hr TTC is our most in-depth path. It is for experienced teachers who want to work closely with individual clients and support wellbeing alongside healthcare practitioners.",
      "You study yoga therapy, Ayurveda and naturopathy in depth, take on supervised case work, and finish with a thesis on a focused area of practice.",
    ],
    image: "/images/programs/consultation.png",
    imageAlt: "Illustration of a one-to-one yoga consultation",
    sections: [
      {
        title: "What you will learn",
        items: [
          "Designing individual yoga therapy programs",
          "Assessment, observation and progress tracking",
          "Pathology basics and working alongside doctors",
          "Applied Ayurveda, naturopathy and lifestyle guidance",
          "Mentoring, workshop design and advanced teaching skills",
        ],
      },
      {
        title: "How the course runs",
        items: [
          "Mentored study across several modules",
          "Supervised one-to-one client sessions",
          "Case study thesis, presented to our faculty",
          "Ask our team about intake and timelines",
        ],
      },
    ],
    highlightsTitle: "Course structure",
    highlights: [
      "Completed 500hr TTC",
      "Advanced yoga therapy modules",
      "Supervised case work",
      "Case study thesis",
    ],
    prerequisites: [
      "A completed 500hr yoga teacher training",
      "Regular teaching experience",
      "A conversation with our faculty before you enrol",
    ],
  },
];
