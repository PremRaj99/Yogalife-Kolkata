import { z } from "zod";

export const registrationSchema = z.object({
  eventId: z.string().min(1).max(200),
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 -]{7,15}$/, "Please enter a valid phone number."),
  message: z.string().trim().max(500, "Please keep it under 500 characters."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
