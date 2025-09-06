import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "@/lib/api/services";
import { CompanyUsageFilters } from "@/lib/api/types/statistics";

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: statisticsService.getStatistics,
  });
}

export function useCompanyUsage(filters?: CompanyUsageFilters) {
  return useQuery({
    queryKey: ["reporting", filters],
    queryFn: () => statisticsService.getCompanyUsage(filters),
    enabled: false
  });
}
