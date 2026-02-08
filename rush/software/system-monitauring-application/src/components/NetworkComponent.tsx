"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Network } from "@/model/networkSchema"
import { useMemo } from "react"

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

export const description = "A radial chart with stacked sections"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartRadialStacked({ data }: { data: Network }) {
  const chartData = useMemo(() => [
    { name: "Received", usage: data.received.toFixed(2) },
    { name: "Transmitted", usage: data.transmitted.toFixed(2) }
  ], [data])

  const COLORS = ["#4f46e5", "#16a34a"]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stacked</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[280px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          {data.received.toFixed(2)}
                          {"Go"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 28}
                          className="fill-muted-foreground text-sm"
                        >
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>

            {chartData.map((entry, index) => (
              <RadialBar
                key={entry.name}
                dataKey="usage"
                stackId="a"
                cornerRadius={5}
                fill={COLORS[index]}
                className="stroke-transparent stroke-2"
              />
            ))}

          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex justify-between items-center gap-2 px-4 py-2 bg-muted/50 rounded-b-md">
        <span className="text-sm font-bold">
          {data.received.toFixed(2)} Received / {data.transmitted.toFixed(2)} Transmitted | Since computer starting
        </span>
        <Button size="sm">+</Button>
      </CardFooter>
    </Card>
  )
}
