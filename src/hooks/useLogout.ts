import { API_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    const resp = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!resp.ok) {
      throw new Error("Error logging out.");
    }
  };
  return { logout };
};

export { useLogout };
