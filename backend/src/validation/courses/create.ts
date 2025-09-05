import { z } from "zod";

export const courseCreateSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character"),
});

export type CourseCreateInput = z.infer<typeof courseCreateSchema>;
