import { z } from "zod";
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least two characters.")
    .max(80, "Please use 80 characters or fewer."),
  email: z.email("Please enter a valid email address."),
  date: z.iso.date("Please choose a valid date."),
});
export const programSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.enum(["Yoga", "Mindfulness", "Wellness"]),
  duration: z.number(),
  description: z.string(),
});
export const programsSchema = z.array(programSchema);
export type Program = z.infer<typeof programSchema>;
