// Content for the Program menu pages. Each entry renders one page at /programs/[slug].
// Titles must match the names in lib/navigation-data.ts so the menu can link to them.
export type ProgramPage = {
  slug: string;
  title: string;
  group?: string;
  tagline: string;
  intro: string[];
  image: string;
  imageAlt: string;
  sections: { title: string; items: string[] }[];
  highlights: string[];
  audience: string[];
  note?: string;
};

export const programPages: ProgramPage[] = [
  {
    slug: "yoga-therapy",
    title: "Yoga therapy",
    tagline: "Gentle, guided practice shaped around your body, your history and how you feel today.",
    intro: [
      "Yoga therapy adapts traditional yoga to the individual. Our therapists look at posture, breath, daily habits and any discomfort you are living with, then build a practice that supports you.",
      "Sessions combine mindful movement, breathwork and relaxation, and can sit alongside guidance from your doctor or physiotherapist.",
    ],
    image: "/images/new/Guided Botanical Yoga Therapy.png",
    imageAlt: "Illustration of guided therapeutic yoga",
    sections: [
      {
        title: "What a session includes",
        items: [
          "A conversation about your health, routine and goals",
          "Adapted asanas with props and safe modifications",
          "Breathwork and relaxation suited to your needs",
          "A short home practice to continue between sessions",
        ],
      },
      {
        title: "Areas we often support",
        items: [
          "Back, neck and joint stiffness",
          "Posture and mobility",
          "Stress, sleep and everyday tension",
          "Recovery and returning to movement",
        ],
      },
    ],
    highlights: ["One-to-one assessment", "Adapted asana", "Pranayama", "Guided relaxation", "Home practice plan"],
    audience: [
      "Anyone looking for a gentle, individual approach",
      "People managing discomfort or recovering from injury",
      "Beginners who prefer a slower start",
    ],
    note: "Yoga therapy supports general wellbeing and is not a substitute for medical treatment.",
  },
  {
    slug: "personal-yoga-training",
    title: "Personal yoga training",
    tagline: "One teacher, your goals, and a practice that moves at your pace.",
    intro: [
      "Personal training gives you a teacher's full attention. Together you set clear goals, whether that is strength, flexibility, calm or a steady daily habit.",
      "Sessions can happen at our studio or online, at times that suit your week.",
    ],
    image: "/images/new/Serene Tree Pose Yoga Lesson.png",
    imageAlt: "Illustration of a private yoga session",
    sections: [
      {
        title: "What you can expect",
        items: [
          "A first session to understand your experience and goals",
          "A practice plan that changes as you progress",
          "Detailed alignment guidance and hands-on cues",
          "Breathwork and meditation woven into practice",
        ],
      },
      {
        title: "How it works",
        items: [
          "Flexible scheduling at the studio or online",
          "Single sessions or regular packages",
          "Ask our team about timings and fees",
        ],
      },
    ],
    highlights: ["Personal goal setting", "Flexible timings", "Studio or online", "Progress check-ins"],
    audience: [
      "Beginners who want a confident start",
      "Regular practitioners refining their practice",
      "Busy schedules that need flexible timings",
    ],
  },
  {
    slug: "group-yoga-training",
    title: "Group yoga training",
    tagline: "Practise alongside others, share the energy of the room, and build a steady routine.",
    intro: [
      "Our group classes are a warm place to practise regularly. Each class balances movement, breath and rest, guided by a teacher who keeps an eye on everyone.",
      "Practising with a community makes it easier to show up, and every pose comes with options for different levels.",
    ],
    image: "/images/new/Serene Botanical Yoga Stretch Class.png",
    imageAlt: "Illustration of a group yoga class",
    sections: [
      {
        title: "What a class includes",
        items: [
          "A gentle warm-up and joint mobility",
          "A balanced asana sequence with options for every level",
          "Pranayama and a short meditation",
          "Relaxation to close the practice",
        ],
      },
      {
        title: "How it works",
        items: [
          "Regular weekly batches at the studio",
          "Morning and evening options",
          "Ask our team about current batch timings",
        ],
      },
    ],
    highlights: ["All levels welcome", "Regular batches", "Asana & pranayama", "Community practice"],
    audience: [
      "Beginners and regular practitioners",
      "Friends or family who want to practise together",
      "Anyone building a consistent routine",
    ],
  },
  {
    slug: "prenatal-yoga",
    title: "Prenatal yoga",
    tagline: "Gentle movement, steady breath and quiet rest for each stage of pregnancy.",
    intro: [
      "Prenatal yoga offers a calm space to stay active and connected with your body during pregnancy. Practices are adapted for each trimester and for how you feel on the day.",
      "Breathwork and relaxation help you settle, rest well and prepare with confidence.",
    ],
    image: "/images/new/Peaceful Prenatal Meditation in Nature.png",
    imageAlt: "Illustration of calm breathing practice",
    sections: [
      {
        title: "What a session includes",
        items: [
          "Gentle, supported asanas adapted by trimester",
          "Breath awareness and calming pranayama",
          "Pelvic floor awareness and posture care",
          "Guided relaxation with props",
        ],
      },
      {
        title: "How it works",
        items: [
          "Small groups or one-to-one sessions",
          "Guided by teachers experienced in prenatal practice",
          "Ask our team about timings and suitable starting points",
        ],
      },
    ],
    highlights: ["Trimester-adapted practice", "Breathwork", "Relaxation", "Small groups"],
    audience: [
      "Expecting mothers with clearance from their doctor",
      "Beginners and experienced practitioners alike",
    ],
    note: "Please consult your doctor before starting prenatal yoga, and tell your teacher about any changes in your health.",
  },
  {
    slug: "weight-management-program",
    title: "Weight management program",
    tagline: "A balanced routine of movement, breath and everyday habits that you can keep up.",
    intro: [
      "Our weight management program brings together active yoga practice, mindful eating habits and Ayurvedic lifestyle guidance.",
      "The focus is on steady, sustainable change: moving more, sleeping better and building routines that feel good.",
    ],
    image: "/images/new/Guided Warrior II in a Botanical Studio.png",
    imageAlt: "Illustration of an active yoga practice",
    sections: [
      {
        title: "What the program includes",
        items: [
          "Dynamic asana sequences and sun salutations",
          "Breathwork to support energy and focus",
          "Mindful eating and daily routine guidance",
          "Ayurvedic lifestyle suggestions",
        ],
      },
      {
        title: "How it works",
        items: [
          "Regular sessions over a set period",
          "Progress check-ins with your teacher",
          "Ask our team about program length and fees",
        ],
      },
    ],
    highlights: ["Active yoga practice", "Lifestyle guidance", "Ayurveda support", "Regular check-ins"],
    audience: [
      "Anyone wanting a healthier, more active routine",
      "People who prefer a gradual, sustainable approach",
    ],
    note: "Results vary from person to person. Please speak with your doctor if you have a health condition.",
  },
  {
    slug: "corporate-yoga",
    title: "Corporate yoga",
    tagline: "Bring a little calm and movement into the working day.",
    intro: [
      "Corporate yoga sessions help teams step away from screens, release tension and return to work with a clearer mind.",
      "We run sessions at your office or online, shaped around your team's schedule and space.",
    ],
    image: "/images/new/Seated Twist in a Botanical Workspace.png",
    imageAlt: "Illustration of colleagues sharing a calm moment",
    sections: [
      {
        title: "What a session includes",
        items: [
          "Desk-friendly stretches for neck, shoulders and back",
          "Short breathing practices for focus and stress",
          "Guided relaxation or meditation",
          "Optional talks on posture and healthy work habits",
        ],
      },
      {
        title: "How it works",
        items: [
          "On-site or online sessions",
          "One-off workshops or regular weekly classes",
          "Ask our team for a plan that suits your organisation",
        ],
      },
    ],
    highlights: ["On-site or online", "Desk-friendly practice", "Stress & focus", "Flexible formats"],
    audience: [
      "Teams of any size",
      "HR and wellbeing programs",
      "Offices, schools and organisations",
    ],
  },
  {
    slug: "senior-citizen-yoga",
    title: "Senior citizen yoga",
    tagline: "Gentle practice for mobility, balance and a calm mind, at a comfortable pace.",
    intro: [
      "Our senior citizen classes focus on safe, gentle movement. Many poses can be done seated or with the support of a chair or wall.",
      "Practice supports flexibility, balance and steady breathing, in a friendly group where no one is rushed.",
    ],
    image: "/images/new/Serene Seated Yoga Stretch in a Garden Studio.png",
    imageAlt: "Illustration of a family wellness gathering",
    sections: [
      {
        title: "What a class includes",
        items: [
          "Joint mobility and chair-supported asanas",
          "Balance practice with support nearby",
          "Simple breathing techniques",
          "Relaxation and gentle meditation",
        ],
      },
      {
        title: "How it works",
        items: [
          "Small groups with close attention",
          "Studio sessions or one-to-one at home on request",
          "Ask our team about timings",
        ],
      },
    ],
    highlights: ["Chair-supported practice", "Balance & mobility", "Gentle pranayama", "Small groups"],
    audience: [
      "Older adults new to yoga",
      "Anyone wanting a slower, supported practice",
    ],
    note: "Please speak with your doctor before starting if you have a health condition.",
  },
  {
    slug: "meditation-and-mindfulness",
    title: "Meditation and mindfulness",
    group: "Mindful living & wellness",
    tagline: "Learn to sit, breathe and notice, and carry a little more stillness into your day.",
    intro: [
      "Our meditation and mindfulness sessions teach simple, traditional techniques you can practise anywhere. No experience is needed, only a willingness to sit quietly for a while.",
      "Each session moves from breath awareness into guided meditation, with time to ask questions and talk about how practice fits into everyday life.",
    ],
    image: "/images/new/Serene Lotus Meditation with Glowing Halo.png",
    imageAlt: "Illustration of a woman meditating in front of a lotus",
    sections: [
      {
        title: "What a session includes",
        items: [
          "Settling the body and breath awareness",
          "Guided meditation, mantra or visualisation",
          "Simple pranayama to calm the mind",
          "Ideas for a short daily practice at home",
        ],
      },
      {
        title: "How it works",
        items: [
          "Group sessions at the studio or online",
          "One-to-one guidance on request",
          "Ask our team about current timings",
        ],
      },
    ],
    highlights: ["Breath awareness", "Guided meditation", "Mantra & chanting", "Daily practice tips"],
    audience: [
      "Complete beginners to meditation",
      "Anyone looking for calm in a busy routine",
      "Yoga practitioners deepening their practice",
    ],
  },
  {
    slug: "ayurveda-consultation",
    title: "Ayurveda consultation",
    group: "Mindful living & wellness",
    tagline: "A personal conversation about your constitution, daily rhythm and wellbeing.",
    intro: [
      "An Ayurveda consultation with our practitioner looks at you as a whole: your body type, digestion, sleep, energy and daily routine.",
      "You leave with practical suggestions on diet, routine and lifestyle, and where useful, how yoga and other therapies can support you.",
    ],
    image: "/images/new/Ayurvedic Wellness Consultation.png",
    imageAlt: "Illustration of Ayurvedic herbal tea and herbs",
    sections: [
      {
        title: "What the consultation includes",
        items: [
          "A detailed conversation about your health and routine",
          "An understanding of your constitution (prakriti)",
          "Diet and daily routine (dinacharya) suggestions",
          "Guidance on suitable therapies and follow-up",
        ],
      },
      {
        title: "How it works",
        items: [
          "In person at the studio, or online",
          "Follow-up sessions to review progress",
          "Ask our team about fees and availability",
        ],
      },
    ],
    highlights: ["Qualified practitioner", "Constitution assessment", "Diet & routine guidance", "Follow-up support"],
    audience: [
      "Anyone curious about Ayurveda",
      "People wanting a more balanced daily routine",
      "Those considering Panchakarma or other therapies",
    ],
    note: "Ayurveda supports general wellbeing and is not a substitute for medical diagnosis or treatment.",
  },
  {
    slug: "panchakarma-therapy",
    title: "Panchakarma therapy",
    group: "Mindful living & wellness",
    tagline: "A traditional Ayurvedic cleanse to rest, restore and reset.",
    intro: [
      "Panchakarma is a classical Ayurvedic program of cleansing and rejuvenating therapies. It is planned individually after a consultation with our Ayurveda practitioner.",
      "Treatments are carried out over several days, alongside light food, rest and gentle yoga.",
    ],
    image: "/images/new/Ayurvedic Oil Massage Sanctuary.png",
    imageAlt: "Illustration of a Shirodhara oil therapy",
    sections: [
      {
        title: "What the program may include",
        items: [
          "Abhyanga, a warm herbal oil massage",
          "Swedana, herbal steam therapy",
          "Shirodhara, a steady stream of oil on the forehead",
          "Other classical therapies chosen for you",
          "Diet and rest guidance during the program",
        ],
      },
      {
        title: "How it works",
        items: [
          "Begins with an Ayurveda consultation",
          "Program length planned for each person",
          "Ask our team about dates and fees",
        ],
      },
    ],
    highlights: ["Personal therapy plan", "Classical treatments", "Diet & rest guidance", "Practitioner supervision"],
    audience: [
      "Adults wanting a structured Ayurvedic reset",
      "Those who have had an Ayurveda consultation",
    ],
    note: "Panchakarma is not suitable for everyone. Our practitioner will advise you after consultation, and please inform your doctor if you have a health condition.",
  },
  {
    slug: "wellness-retreat",
    title: "Wellness retreat",
    group: "Mindful living & wellness",
    tagline: "Step away from routine for a few days of practice, rest and good company.",
    intro: [
      "Our wellness retreats bring together yoga, meditation, Ayurvedic meals and time in nature. They are a chance to slow down and return home feeling refreshed.",
      "Each retreat follows a gentle daily rhythm, with space for both group practice and quiet time on your own.",
    ],
    image: "/images/new/Sunrise Yoga at the Temple Ghat.png",
    imageAlt: "Illustration of sunrise yoga on riverside ghats",
    sections: [
      {
        title: "A typical day",
        items: [
          "Morning yoga and pranayama",
          "Wholesome, Ayurveda-inspired meals",
          "Workshops, walks or local visits",
          "Evening meditation or chanting",
        ],
      },
      {
        title: "How it works",
        items: [
          "Retreats run on set dates through the year",
          "Accommodation and meals arranged by our team",
          "See our retreats section or ask for upcoming dates",
        ],
      },
    ],
    highlights: ["Daily yoga & meditation", "Ayurvedic meals", "Nature & rest", "Small groups"],
    audience: [
      "Beginners and regular practitioners",
      "Anyone needing a calm break from routine",
      "Friends or family travelling together",
    ],
  },
  {
    slug: "online-yoga-classes",
    title: "Online yoga classes",
    group: "Mindful living & wellness",
    tagline: "Live, guided practice with our teachers, from wherever you are.",
    intro: [
      "Online classes let you keep a regular practice from home. Classes are live, so your teacher can see you, guide you and answer your questions.",
      "You only need a quiet space, a mat and a stable internet connection.",
    ],
    image: "/images/new/Warm Home Yoga Practice.png",
    imageAlt: "Illustration of a yoga practice",
    sections: [
      {
        title: "What a class includes",
        items: [
          "Warm-up and a balanced asana sequence",
          "Pranayama and a short meditation",
          "Live cues and corrections from your teacher",
          "Relaxation to close the practice",
        ],
      },
      {
        title: "How it works",
        items: [
          "Group batches or private online sessions",
          "Joining link shared before each class",
          "Ask our team about timings and fees",
        ],
      },
    ],
    highlights: ["Live classes", "Group or private", "All levels", "Practise from home"],
    audience: [
      "Anyone outside Kolkata or short on travel time",
      "Beginners who prefer starting at home",
      "Regular practitioners keeping a routine",
    ],
  },
];

export function programHref(title: string) {
  const page = programPages.find((p) => p.title === title);
  return page ? "/programs/" + page.slug : undefined;
}
