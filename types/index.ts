export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface TeamMember {
  [x: string]: string;
  id: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  user: Pick<User, "name" | "email" | "image">;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  members: TeamMember[];
  _count: {
    members: number;
  };
}
