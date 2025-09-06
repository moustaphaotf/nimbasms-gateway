import { Membership, PaginatedResponse, MembershipFilters } from "../types";
import { API_ENDPOINTS } from "../endpoints";
import apiClient from "../client";
import { MembershipFormData } from "@/lib/schemas/membership.schema";

export const membersService = {
  getMembers: async (filters?: MembershipFilters) => {
    const { data } = await apiClient.get<PaginatedResponse<Membership>>(
      API_ENDPOINTS.MEMBERSHIP.LIST,
      { params: filters }
    );
    return data;
  },

  createMember: async (userData: MembershipFormData) => {
    const { data } = await apiClient.post<Membership>(
      API_ENDPOINTS.MEMBERSHIP.CREATE,
      userData
    );
    return data;
  },

  changeRole: async ({ id, role }: { id: string; role: string }) => {
    const { data } = await apiClient.patch<Membership>(
      API_ENDPOINTS.MEMBERSHIP.CHANGE_ROLE(id),
      { role }
    );
    return data;
  },
};
