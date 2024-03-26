import { z } from "zod"

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>
