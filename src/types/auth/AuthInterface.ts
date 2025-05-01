export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  token: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  // loginAction: (data: { phone?: string; password: string }) => Promise<void>;
  logOut: () => void;
  requestOtp: (phone: string, password: string) => Promise<void>;
  verifyOtp: (phone: string, password: string, otp: string) => Promise<void>;
}
