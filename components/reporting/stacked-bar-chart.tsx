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
import { motion } from "framer-motion";

const chartConfig = {
  Cellcom_count: {
    label: "Cellcom",
    color: "hsl(var(--chart-2))",
  },
  Orange_count: {
    label: "Orange",
    color: "hsl(var(--chart-1))",
  },
  Areeba_count: {
    label: "Areeba",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type TransformedData = {
  owner__company_name: string;
  Orange_count: number;
  Areeba_count: number;
  Cellcom_count: number;
};

export function CompanyUsageStackedChart({ data }: { data: CompanyUsage[] }) {
  const transformedData: TransformedData[] = data.map((company) => {
    const operatorData = company.count.reduce(
      (acc: any, { operator, count }: { operator: string; count: number }) => {
        if (operator === "Orange") acc.Orange_count = count;
        if (operator === "Areeba") acc.Areeba_count = count;
        if (operator === "Cellcom") acc.Cellcom_count = count;
        return acc;
      },
      {
        owner__company_name: company.owner__company_name,
        Orange_count: 0,
        Areeba_count: 0,
        Cellcom_count: 0,
      }
    );
    return operatorData;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Consommation des clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={transformedData}>
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
                dataKey="Areeba_count"
                stackId="a"
                fill="var(--color-Areeba_count)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="Orange_count"
                stackId="a"
                fill="var(--color-Orange_count)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Cellcom_count"
                stackId="a"
                fill="var(--color-Cellcom_count)"
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
                              {item.payload.Orange_count +
                                item.payload.Cellcom_count +
                                item.payload.Cellcom_count}
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
    </motion.div>
  );
}
