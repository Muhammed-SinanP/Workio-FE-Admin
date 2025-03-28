import { z } from "zod";

export const profileSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  userEmail: z.string().email()
});