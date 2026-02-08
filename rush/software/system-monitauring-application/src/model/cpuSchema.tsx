import { z } from "zod";

const CoreSchema = z.object({
    frequency: z.number(),
    usage: z.number(),
    name: z.string(),
    vendor: z.string()
});

export const CpuSchema = z.object({
    usage: z.number(),
    computer_cores: z.array(CoreSchema)
})


export type Core = z.infer<typeof CoreSchema>
export type Cpu = z.infer<typeof CpuSchema>
