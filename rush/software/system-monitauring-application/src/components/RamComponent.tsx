"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"
import { Memory } from "@/model/memorySchema"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "./ui/button"

export const description = "A donut chart with text"

const chartConfig = {
    value: {
        label: "Ram Usage in %",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

export function RamChartPieDonut({ data }: {data: Memory}) {
	const chartData = useMemo(() => [
	  { name: "TotalMemory", usage: (data.total_memory / 1000000000)},
	  { name: "Used", usage: (data.used_memory / 1000000000)}
	], [data])

    let memory_used = ((data.used_memory) / 1000000000);
    let memory_total = ((data.total_memory) / 1000000000);
    let memory_available = (memory_total - memory_used).toFixed(2);

    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Memory</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[220px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
			  <Pie
			  	data={chartData}
  				dataKey="usage"
  				nameKey="name"
  				innerRadius={80}
				outerRadius={100}
  				strokeWidth={60}
  				cornerRadius={3}
				>
					{chartData.map((entry, index) => (
						<Cell key={index} fill={entry.name === "Used" ? "hsl(var(--chart-6)" : "hsl(var(--chart-1)"} />
					))}
                <Label
				position="center"
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            className="fill-foreground text-3xl font-bold"
                          >
                            {((data.used_memory / data.total_memory) * 100).toFixed(2)}
							{"%"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
   <CardFooter className="flex justify-between items-center gap-2 px-4 py-2 bg-muted/50 rounded-b-md">
      <span className="text-sm font-bold">
          Total: {memory_total.toPrecision(2)} GB | Used: {memory_used.toPrecision(2)} GB | Available: {memory_available} GB
        </span>
        <Button size="sm">+</Button>
      </CardFooter>
      </Card>
    )
}
