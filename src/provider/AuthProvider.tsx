import { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../types/auth/AuthInterface";
import Swal from "sweetalert2";

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
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, password }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid phone number or password.",
        });
        throw new Error(data.message);
      }
  
      return data;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Request Error",
        text: err.message || "Something went wrong while sending OTP.",
      });
      throw err;
    }
  };
  
  const verifyOtp = async (phone: string, code: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: phone,
            otp: code,
          }),
        }
      );
  
      const data = await res.json();
  
      if (data.token) {
        const userData: User = {
          id: data.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          role: data.role,
          token: data.token,
          // Add other fields if needed
        };
  
        setUser(userData);
        setToken(data.token);
  
        localStorage.setItem(
          "site",
          JSON.stringify({ user: userData, token: data.token })
        );
        return;
      }
  
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: data.message || "Invalid OTP or phone number.",
      });
  
      throw new Error(data.message);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Verification Error",
        text: err.message || "Something went wrong during OTP verification.",
      });
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
