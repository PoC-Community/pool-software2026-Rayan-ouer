"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"
import { Cpu } from "@/model/cpuSchema"

import {
  Card,
  CardContent,
  CardDescription,
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
        label: "CPU Usage in %",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

export function CpuChartPieDonut({ data }: {data: Cpu}) {
	const chartData = useMemo(() => [
	  { name: "Used", usage: data.usage },
	  { name: "Free", usage: 100 - data.usage }
	], [data.usage])

    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Usage</CardTitle>
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
						<Cell key={index} fill={entry.name === "Used" ? "hsl(var(--chart-2)" : "hsl(var(--chart-)"} />
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
                            {data.usage.toFixed(2)}
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
          {data.computer_cores.length} Cores {data.computer_cores[0].vendor}
        </span>
        <Button size="sm">+</Button>
      </CardFooter>
      </Card>
    )
}
