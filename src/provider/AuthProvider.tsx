import { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../types/auth/AuthInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const siteData = JSON.parse(localStorage.getItem("site") || "{}");

  const [user, setUser] = useState<User | null>(siteData?.user || null);
  const [token, setToken] = useState<string>(siteData?.token || "");

  const requestOtp = async (phone: string, password: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: phone, password, role: "ADMIN" }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      console.error("OTP request error:", err);
      throw err;
    }
  };

  const verifyOtp = async (phone: string, password: string, code: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Forhad Ahmed",
            phoneNumber: phone,
            otp: code,
            password,
            role: "ADMIN",
          }),
        }
      );

      const data = await res.json();

      // If your backend returns the full user info + token in a flat structure:
      if (data.token) {
        const userData: User = {
          id: data.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          // Add any other fields from your User interface
        };

        setUser(userData);
        setToken(data.token);

        localStorage.setItem(
          "site",
          JSON.stringify({ user: userData, token: data.token })
        );
        return;
      }

      throw new Error(data.message);
    } catch (err) {
      console.error("OTP verification error:", err);
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, requestOtp, verifyOtp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
