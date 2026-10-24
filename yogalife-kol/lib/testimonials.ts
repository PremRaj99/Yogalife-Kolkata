// TODO: replace the placeholder text reviews with real member reviews (e.g. from Google) before going live.
export type Testimonial =
  | { type: "video"; src: string }
  | { type: "text"; name: string; source: string; text: string };

const video = (n: number): Testimonial => ({ type: "video", src: `/testimonials/Testimonial${n}.mp4` });
const placeholder = (n: number): Testimonial => ({
  type: "text",
  name: `Member name ${n}`,
  source: "Google review",
  text: "Placeholder review. Replace with a real member review.",
});

// Videos take 2 grid rows, text reviews take 1. 9 videos + 6 reviews = 24 cells,
// which fills 4 or 2 columns exactly. Keep this order so the grid has no gaps.
export const testimonials: Testimonial[] = [
  video(1), placeholder(1), video(2), video(3),
  placeholder(2), video(4), video(5), placeholder(3),
  video(6), video(7), placeholder(4), video(8), video(9),
  placeholder(5), placeholder(6),
];
