import { cookies } from "next/headers";

import type { UserData } from "@/types";

const AUTH_COOKIE_NAME = "auth_token";

export const getServerSession = async (): Promise<UserData | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token,
  };
};

export const requireAuth = async (): Promise<UserData> => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
};
