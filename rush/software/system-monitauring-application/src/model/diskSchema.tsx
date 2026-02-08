import { z } from "zod";

const PidSchema = z.object({
    pid_name: z.string(),
    usage: z.number()
})

export const DiskInfoSchema = z.object({
    total: z.number(),
    used: z.number(),
    available: z.number(),
    pids_vec: z.array(PidSchema)
})


export type DiskInfo = z.infer<typeof PidSchema>
export type Disk = z.infer<typeof DiskInfoSchema>