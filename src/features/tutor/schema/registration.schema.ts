import { z } from "zod";

export const onboardingSchema = z.object({
  headline: z.string().min(5, "Headline required"),
  bio: z.string().min(10, "Bio required").max(500),

  experiences: z.array(
    z.object({
      role: z.string().min(1),
      company: z.string().min(1),
      duration: z.string().min(1),
      description: z.string().optional(),
    })
  ),

  education: z.array(
    z.object({
      degree: z.string().min(1),
      institution: z.string().min(1),
      year: z.string().min(1),
    })
  ),

  skills: z.array(z.string()).min(1, "Add at least one skill"),

  certificates: z.array(
    z.object({
      url: z.string().nullable(),
      key: z.string().nullable(),
    })
  ),
  links: z.object({
    linkedin: z.string().url().optional().or(z.literal("")),
    portfolio: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
  }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;