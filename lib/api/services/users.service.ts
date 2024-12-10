import { User, PaginatedResponse } from "../types";
import { API_ENDPOINTS } from "../endpoints";
import apiClient from "../client";
import { CreateUserFormData } from "@/lib/schemas/user.schema";

export interface UserFilters {
  offset?: number;
  limit?: number;
  search?: string;
  ordering?: string;
}

export const usersService = {
  getUsers: async (filters?: UserFilters) => {
    const { data } = await apiClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.AUTH.USER_LIST,
      { params: filters }
    );
    return data;
  },

  createUser: async (userData: CreateUserFormData) => {
    const { data } = await apiClient.post<User>(
      API_ENDPOINTS.AUTH.CREATE_USER,
      userData
    );
    return data;
  },
};
