import { User, PaginatedResponse } from '../types';
import { API_ENDPOINTS } from '../endpoints';
import apiClient from '../client';
import { CreateUserFormData } from '@/lib/schemas/user.schema';
import { generatePassword } from '@/lib/utils';

export interface UserFilters {
  offset?: number;
  limit?: number;
  search?: string;
  order?: string;
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
    const password = generatePassword();
    const { data } = await apiClient.post<User>(API_ENDPOINTS.AUTH.CREATE_USER, {
      ...userData,
      password,
    });
    return { ...data, generatedPassword: password };
  },
};