import { z } from "zod";

enum AlertType {
    INFO = "info",
    WARNING = "warning",
}

const AlertSchema = z.object({
    info: z.string(),
    max_value: z.number(),
    value: z.number(),
    type: z.enum(AlertType)
});

export type AlertComputer = z.infer<typeof AlertSchema>