export type Membership = {
  uid: string;
  role: "Developer" | "Owner" | "Member";
  added_at: string;
  member: {
    email: string;
    first_name: string;
    last_name: string;
  };
  organisation_name: string;
  is_active: boolean;
};

export type MembershipFilters = {
  offset?: number;
  limit?: number;
  search?: string;
  ordering?: string;
};
