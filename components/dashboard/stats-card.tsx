interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
}

export function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="rounded-lg bg-muted p-6">
      <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xl font-bold">{value}</p>
        <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}