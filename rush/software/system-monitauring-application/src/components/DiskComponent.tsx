"use client"

import * as React from "react"
import { Disk } from "@/model/diskSchema";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";

export function DiskProgressLine({ data }: { data: Disk }) {
  const total = (data.total / 1000_000_000).toFixed(2);
  const used = (data.used / 1000_000_000).toFixed(2);
  const available = (data.available / 1000_000_000).toFixed(2);
  const progress =
    data.total > 0 ? Math.floor((data.used / data.total) * 100) : 0;

  return (
    <Card className="flex flex-col">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-center text-lg font-bold">Disk Usage</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-20 rounded-lg bg-red-500/10 flex flex-col items-center justify-center">
            <span className="mb-2 text-sm font-semibold">Used</span>
            <span className="text-base font-bold">{used} GB</span>
          </div>
          <div className="h-20 rounded-lg bg-green-500/10 flex flex-col items-center justify-center">
            <span className="mb-2 text-sm font-semibold">Available</span>
            <span className="text-base font-bold">{available} GB</span>
          </div>
          <div className="h-20 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center">
            <span className="mb-2 text-sm font-semibold">Total</span>
            <span className="text-base font-bold">{total} GB</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Progress value={progress} className="w-full h-8 rounded-lg" />
          <div className="text-center text-sm text-muted-foreground font-medium">
            {progress}% used
          </div>
        </div>
      </div>
   <CardFooter className="flex justify-between items-center gap-2 px-4 py-2 bg-muted rounded-b-md">
        <Button size="sm" className="ml-auto">+</Button>
      </CardFooter>
    </Card>
  );
}
