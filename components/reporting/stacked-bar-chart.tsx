"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CompanyUsage } from "@/lib/api/types/statistics";

const chartConfig = {
  message_count_delivered: {
    label: "Reçu",
    color: "hsl(var(--chart-2))",
  },
  message_count_sent: {
    label: "Inconnu",
    color: "hsl(var(--chart-1))",
  },
  message_count_failure: {
    label: "Echec",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function CompanyUsageStackedChart({ data }: { data: CompanyUsage[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consommation des clients</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="owner__company_name"
              tickLine={false}
              tickMargin={10}
              axisLine
            />
            <YAxis
              tickLine={false}
              axisLine
              tickFormatter={(value) => value.toLocaleString()} // Format Y-axis values
            />

            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <ChartLegend
              wrapperStyle={{ paddingTop: 20 }} // Ajustez le padding si nécessaire
              formatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              } // Utilisez les labels de chartConfig
            />

            <Bar
              dataKey="message_count_delivered"
              stackId="a"
              fill="var(--color-message_count_delivered)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="message_count_sent"
              stackId="a"
              fill="var(--color-message_count_sent)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="message_count_failure"
              stackId="a"
              fill="var(--color-message_count_failure)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={
                          {
                            "--color-bg": `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                      </div>
                      {/* Add this after the last item */}
                      {index === 2 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {item.payload.message_count_delivered +
                              item.payload.message_count_sent +
                              item.payload.message_count_failure}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
