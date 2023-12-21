import { UserModel, UserRole, UserStatus } from "../model";

export const defaultUserData: UserModel[] = [
  {
    name: "Liam Johnson",
    email: "liam@example.com",
    id: "3aB7k9pFXl5Mv2zA",
    role: UserRole.admin,
    status: UserStatus.inActive,
  },
  {
    name: "Olivia Smith",
    email: "olivia@example.com",
    id: "Qs2G8dRtKj9Pq7hT",
    role: UserRole.user,
    status: UserStatus.active,
  },
  {
    name: "Noah Williams",
    email: "noah@example.com",
    id: "6yH1i4oWEw3Zf6cY",
    role: UserRole.admin,
    status: UserStatus.inActive,
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    id: "Xl5Mv2zAKj9Pq7hT",
    role: UserRole.admin,
    status: UserStatus.inActive,
  },
  {
    name: "Ethan Davis",
    email: "ethan@example.com",
    role: UserRole.admin,
    status: UserStatus.active,
    id: "Kj9Pq7hTEw3Zf6cY",
  },
  {
    name: "Ava Miller",
    email: "ava@example.com",
    role: UserRole.user,
    status: UserStatus.inActive,
    id: "Ew3Zf6cY8nU0x1sL",
  },
  {
    name: "Jackson Wilson",
    email: "jackson@example.com",
    role: UserRole.admin,
    status: UserStatus.active,
    id: "8nU0x1sL4rI7oXvN",
  },
  {
    name: "Sophia Anderson",
    email: "sophia@example.com",
    role: UserRole.user,
    status: UserStatus.inActive,
    id: "4rI7oXvNDg5H2bRv",
  },
  {
    name: "Aiden Martinez",
    email: "aiden@example.com",
    role: UserRole.admin,
    status: UserStatus.active,
    id: "Dg5H2bRv1tF6u8sQ",
  },
  {
    name: "Isabella Taylor",
    email: "isabella@example.com",
    role: UserRole.user,
    status: UserStatus.inActive,
    id: "1tF6u8sQKj9Pq7hT",
  },
];
