import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data generator
const generateMockMembership = (id: number) => ({
  id: id,
  user: {
    id: id,
    email: `member${id}@example.com`,
    first_name: `Member${id}`,
    last_name: "Test",
    is_active: true,
  },
  organization: {
    id: 1,
    name: "Gateway Demo",
    slug: "gateway-demo",
  },
  role: ["admin", "member", "viewer"][Math.floor(Math.random() * 3)],
  is_active: Math.random() > 0.1,
  created_at: new Date(
    Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
  ).toISOString(),
  updated_at: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
});

export const membershipHandlers = [
  // Get Members List
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.MEMBERSHIP.LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const role = url.searchParams.get("role");
    const search = url.searchParams.get("search");

    let mockMembers = Array.from({ length: 35 }, (_, i) =>
      generateMockMembership(i + 1)
    );

    // Apply filters
    if (role) {
      mockMembers = mockMembers.filter((member) => member.role === role);
    }
    if (search) {
      mockMembers = mockMembers.filter(
        (member) =>
          member.user.email.toLowerCase().includes(search.toLowerCase()) ||
          member.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          member.user.last_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const paginatedMembers = mockMembers.slice(offset, offset + limit);

    return HttpResponse.json({
      count: mockMembers.length,
      next:
        offset + limit < mockMembers.length
          ? `${API_ENDPOINTS.MEMBERSHIP.LIST}?offset=${
              offset + limit
            }&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${API_ENDPOINTS.MEMBERSHIP.LIST}?offset=${Math.max(
              0,
              offset - limit
            )}&limit=${limit}`
          : null,
      results: paginatedMembers,
    });
  }),

  // Create Member
  http.post(
    `${BASE_URL}/v1${API_ENDPOINTS.MEMBERSHIP.CREATE}`,
    async ({ request }) => {
      const memberData: any = await request.json();
      return HttpResponse.json({
        id: Math.floor(Math.random() * 1000) + 100,
        user: {
          id: Math.floor(Math.random() * 1000) + 100,
          email: memberData?.email!,
          first_name: memberData?.first_name!,
          last_name: memberData?.last_name!,
          is_active: true,
        },
        organization: {
          id: 1,
          name: "Gateway Demo",
          slug: "gateway-demo",
        },
        role: memberData.role || "member",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  ),

  // Change Role
  http.patch(
    `${BASE_URL}/auth/v1/memberships/:id/change_role`,
    async ({ params, request }) => {
      const membershipId = parseInt(params.id as string);
      const { role }: any = await request.json();

      if (isNaN(membershipId)) {
        return HttpResponse.json(
          { error: "Invalid membership ID" },
          { status: 400 }
        );
      }

      const mockMembership = generateMockMembership(membershipId);

      return HttpResponse.json({
        ...mockMembership,
        role: role,
        updated_at: new Date().toISOString(),
      });
    }
  ),
];
