import { z } from "zod";
import { CpuSchema } from "./cpuSchema";
import { DiskSchema } from "./diskSchema";
import { MemorySchema } from "./memorySchema";
import { NetworkSchema } from "./networkSchema";
import { HostSchema } from "./hostSchema";

export const ModuleSchema = z.object({
    cpu: CpuSchema,
    disk: DiskSchema,
    memory: MemorySchema,
    network: NetworkSchema,
    host: HostSchema
})

export type Module = z.infer<typeof ModuleSchema>