import { z } from "zod";
import { CpuSchema } from "./cpuSchema";
import { DiskInfoSchema } from "./diskSchema";
import { MemorySchema } from "./memorySchema";
import { NetworkSchema } from "./networkSchema";
import { HostSchema } from "./hostSchema";
import { GpuSchema } from "./gpuSchema";

export const ModuleSchema = z.object({
    cpu: CpuSchema,
    disk: DiskInfoSchema,
    memory: MemorySchema,
    network: NetworkSchema,
    host: HostSchema,
    gpu: GpuSchema
})

export type Module = z.infer<typeof ModuleSchema>