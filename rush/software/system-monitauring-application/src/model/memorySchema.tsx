import { z } from "zod";

export const MemorySchema = z.object({
    total_memory: z.number(),
    used_memory: z.number(),
    total_swap: z.number(),
    used_swap: z.number()
})

export type Memory = z.infer<typeof MemorySchema>
