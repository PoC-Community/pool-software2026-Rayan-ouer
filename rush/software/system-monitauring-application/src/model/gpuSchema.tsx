import { z } from "zod";

export const GpuSchema = z.object({
    model: z.string(),
    temperature: z.number(),
    total_vram: z.number(),
    used_vram: z.number()
});

export type Gpu = z.infer<typeof GpuSchema>
