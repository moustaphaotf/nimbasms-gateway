import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { Membership } from "../../lib/api/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data generator
const generateMockMembership = (id: number): Membership => ({
  uid: `membership-${id}`,
  role: ["Developer", "Owner", "Member"][Math.floor(Math.random() * 3)] as "Developer" | "Owner" | "Member",
  added_at: new Date(
    Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
  ).toISOString(),
  member: {
    email: `member${id}@example.com`,
    first_name: `Member${id}`,
    last_name: "Test",
  },
  organisation_name: process.env.NEXT_PUBLIC_APP_NAME || "Gateway Demo",
  is_active: Math.random() > 0.1,
});

export const membershipHandlers = [
  // Get Members List
  http.get(`${BASE_URL}${API_ENDPOINTS.MEMBERSHIP.LIST}`, ({ request }) => {
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
          member.member.email.toLowerCase().includes(search.toLowerCase()) ||
          member.member.first_name.toLowerCase().includes(search.toLowerCase()) ||
          member.member.last_name.toLowerCase().includes(search.toLowerCase())
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
    `${BASE_URL}${API_ENDPOINTS.MEMBERSHIP.CREATE}`,
    async ({ request }) => {
      const memberData: any = await request.json();
      const newMembership: Membership = {
        uid: `membership-${Math.floor(Math.random() * 1000) + 100}`,
        role: memberData.role || "Member",
        added_at: new Date().toISOString(),
        member: {
          email: memberData.email,
          first_name: memberData.first_name,
          last_name: memberData.last_name,
        },
        organisation_name: process.env.NEXT_PUBLIC_APP_NAME || "Gateway Demo",
        is_active: true,
      };
      return HttpResponse.json(newMembership);
    }
  ),

  // Change Role
  http.patch(
    `${BASE_URL}${API_ENDPOINTS.MEMBERSHIP.CHANGE_ROLE(":id")}`,
    async ({ params, request }) => {
      const membershipId = params.id as string;
      const { role }: any = await request.json();

      if (!membershipId) {
        return HttpResponse.json(
          { error: "Invalid membership ID" },
          { status: 400 }
        );
      }

      const mockMembership = generateMockMembership(parseInt(membershipId) || 1);

      return HttpResponse.json({
        ...mockMembership,
        role: role,
      });
    }
  ),
];
