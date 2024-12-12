"use client";

import { DailyUsage } from "@/lib/api/types/statistics";

import * as React from "react";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface UsageChartProps {
  data: DailyUsage[];
}

const chartConfig = {
  count: {
    label: "Total",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function UsageChart({ data }: UsageChartProps) {
  return (
    <Card>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data.map((item) => ({ ...item, count: item.count || 0 }))}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey={"count"} allowDecimals={false}>
              <Label
                angle={-90}
                position="center"
                offset={10}
                value={"SMS Envoyés"}
              />
            </YAxis>
            <XAxis
              dataKey="day"
              // tickLine={false}
              // axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="day"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />

            <Line
              dataKey={"count"}
              type="monotone"
              stroke={`var(--color-count)`}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
