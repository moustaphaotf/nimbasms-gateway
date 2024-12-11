import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/lib/api/services';

export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: statisticsService.getStatistics,
  });
}