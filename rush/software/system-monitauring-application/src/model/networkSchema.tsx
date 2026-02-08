import { z } from "zod";

export const NetworkSchema = z.object({
    received: z.number(),
    transmitted: z.number(),
    ip_adress: z.string()
})

export type Network = z.infer<typeof NetworkSchema>
