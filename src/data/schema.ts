import { z } from "zod"

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
})

export const formSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "invalid input type",
    })
    .min(10, { message: "title must contain at least 5 characters." })
    .max(100, { message: "title must not exceed 100 characters." }),
  description: z
    .string({
      required_error: "password is required",
      invalid_type_error: "invalid input type",
    })
    .min(10, { message: "description must contain at least 10 characters." })
    .max(255, { message: "description must not exceed 255 characters." }),
  due_date: z.date({
    required_error: "A due date is required.",
  }),
  priority: z.enum(["high", "medium", "low"], {
    required_error: "Priority is required",
    invalid_type_error: "Invalid priority type",
  }),
  status: z.enum(["pending", "in_progress", "completed"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status type",
  })
});

export type Task = z.infer<typeof taskSchema>
