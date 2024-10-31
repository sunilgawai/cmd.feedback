export type Role = "OWNER" | "ADMIN" | "MEMBER";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface TeamMember {
  id: string;
  role: Role;
  userId: string;
  teamId: string;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  members: {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
    };
    id: string;
    userId: string;
    role: Role;
    teamId: string;
  }[];
  _count: {
    members: number;
  };
}
