import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type User = {
  id: number;
  email: string;
  username: string;
} | null;

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});
