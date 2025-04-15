export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  loginAction: (data: { email: string; password: string }) => Promise<void>;
  logOut: () => void;
}
