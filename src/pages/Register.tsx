// src/Register.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/useAuth";
import { useNavigate } from "react-router";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Register: React.FC = () => {
  const auth = useAuth();
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await auth.loginAction({ email: "", password });
      navigation("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      navigation("/dashboard");
    }
  }, [auth.token, navigation]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-500 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Registration
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Create a new account
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <PhoneInput
                    international
                    defaultCountry="RU"
                    withCountryCallingCode
                    countryCallingCodeEditable={false}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    style={{
                      padding: "10px 15px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "100%",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                    }}
                    countrySelectProps={{
                      style: {
                        padding: "8px",
                        borderRadius: "6px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Input Password
                </label>
                <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 focus:outline-none dark:text-slate-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 focus:outline-none dark:text-slate-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I have read an agreement.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ background: "black" }}
                  className={`bg-slate-800 w-full py-3 px-4 rounded-lg text-white font-medium ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition duration-200 shadow-md`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-sm text-gray-600">
              You have already an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
