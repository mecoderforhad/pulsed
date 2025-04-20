import { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../types/auth/AuthInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );

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
          body: JSON.stringify({ name: "Forhad Ahmed", phoneNumber: phone, otp: code, password, role: "ADMIN" }),
        }
      );

      const data = await res.json();
      if (data.token) {
        setUser(data.token);
        setToken(data.token.token);
        localStorage.setItem("site", data);
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
