import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUser() {
  const { setUser } = useContext(UserContext);

  async function check() {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_ORIGIN + "/auth/check",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch {}
  }

  return { check };
}
