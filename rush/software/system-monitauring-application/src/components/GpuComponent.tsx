"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "./ui/button"
import { ExportButton } from "./ExportButton"
import { Gpu } from "@/model/gpuSchema"

export const description = "A radial chart showing GPU VRAM usage with temperature"

const chartConfig = {
  value: {
    label: "VRAM Usage in %",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function GpuRadialTemperature({ data }: { data: Gpu }) {
  const chartData = useMemo(() => [
    { name: "Used VRAM", usage: data.used_vram },
    { name: "Free VRAM", usage: data.total_vram - data.used_vram },
  ], [data])

  const totalVRAM = (data.total_vram / 1000000000).toFixed(2)
  const usedVRAM = (data.used_vram / 1000000000).toFixed(2)
  const availableVRAM = (parseFloat(totalVRAM) - parseFloat(usedVRAM)).toFixed(2)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{data.model}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="usage"
              cornerRadius={10}
              background
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
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
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {data.temperature}°C
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Temperature
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 px-4 py-2 bg-muted/50 rounded-b-md">
        <span className="text-sm font-bold">
          Total: {totalVRAM} GB | Used: {usedVRAM} GB | Available: {availableVRAM} GB
        </span>
        <Button size="sm">+</Button>
        <ExportButton data={data} />
      </CardFooter>
    </Card>
  )
}
