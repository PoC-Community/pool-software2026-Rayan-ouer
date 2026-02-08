import { z } from "zod";

export const HostSchema = z.object({
    name: z.string(),
    kernel: z.string(),
    os: z.string(),
    host_name: z.string()
})