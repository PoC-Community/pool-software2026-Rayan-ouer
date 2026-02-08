import { z } from "zod";

const PidSchema = z.object({
    pid_name: z.string(),
    usage: z.number()
})

export const DiskSchema = z.object({
    pids_vec: z.array(PidSchema)
})

export type Disk = z.infer<typeof PidSchema>