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
      "This comprehensive training program emphasizes Yoga as the core subject, with additional modules in Ayurveda and Naturopathy. Participants also receive study materials, a prescribed dress code, a yoga mat, and herbal tea daily.",
    ],
    image: "/images/new/Watercolor Yoga Class with Botanical Calm.png",
    imageAlt: "Illustration of a yoga teacher guiding a class",
    sections: [
      {
        title: "Course duration & daily routine",
        items: [
          "200-Hour RYTTC: March 20, 2025 to April 20, 2025",
          "Program sessions run from 2:00 PM to 6:00 PM (further details are shared once registration is complete)",
          "Included: snacks and herbal tea",
          "Live sessions are conducted as part of the daily schedule",
        ],
      },
      {
        title: "Program details & certification",
        items: [
          "The 200-Hour and 300-Hour training programs are organized as residential modules spanning 15 to 20 days",
          "A minimum of 120 hours of individual Yoga practice is required for graduation",
          "Graduates receive a Yoga Teacher Certification from UYLS (YogaLife Kolkata), qualifying them to register with Yoga Alliance as a certified teacher",
          "UYLS/YogaLife is accredited by the Council for Yoga Accreditation & Affiliations, the International Yoga Federation and Yoga Alliance International",
        ],
      },
      {
        title: "Fees & payment",
        items: [
          "200-Hour RYTTC: ₹30,000",
          "100% of the fee is to be paid by March 20, 2025",
          "Payments can be made via UPI or QR Code",
        ],
      },
      {
        title: "Required documents",
        items: [
          "A government-authorized ID (Aadhar Card, Passport or Voter ID)",
          "One recent passport-sized photograph",
        ],
      },
      {
        title: "How to apply",
        items: [
          "Apply online at www.yogalifekolkata.com",
          "All applicants undergo an interview as part of the application process",
          "If you have any questions or would like to discuss further, feel free to contact us",
        ],
      },
    ],
    highlightsTitle: "Course content",
    highlights: [
      "Aasanas (Postures: Standing, Seated, Supine, Prone)",
      "Techniques to Master the Postures",
      "Anatomy & Human Physiology",
      "Pranayama",
      "Mudras & Kriyas (Shatkarma – Cleansing Techniques)",
      "Bandhas, Bhavas, and Positive Attitude",
      "Counseling & Public Speaking",
      "Teaching Methodology & Presentation Skills",
      "Yogic Diet",
      "Concentration and Meditation Techniques",
      "Sankhya Philosophy and Literary References",
      "Ayurveda and Naturopathy",
      "Internet References / PDF Books / PPTs",
    ],
    prerequisites: [
      "Age: 18+",
      "Ability to read, write, and understand English",
      "Willingness to use a computer and the internet for making presentations",
      "Interest in practicing and teaching Yoga",
      "No chronic illness or debilitating physical condition",
      "Commitment to following a Yogic lifestyle",
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
