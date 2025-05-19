// src/Login.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import RegistrationOtpVerification from "./RegistrationOtpVerification";
import { Link } from "react-router";

type FormData = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function RegisterRefer() {
  const [isLoading, setIsLoading] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [formData, setFormData] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  const [phone, setPhone] = useState<string | undefined>();

  const onSubmit = handleSubmit(async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: formData.phone,
            password: formData.password,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      } else {
        setOpenOtp(!openOtp);
        setFormData(formData);
      }
      reset();
    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Show error to user (you could use a toast notification instead)
      alert(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="py-20">
      <div className="flex flex-col items-center">
        <div className="bg-blue-500 p-3 rounded-full mb-6">
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
        <h2 className="text-white text-3xl font-bold mb-2">Registration</h2>
        <p className="text-gray-400 mb-6">Create a new account</p>

        <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full text-white mb-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-transparent"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-white text-sm font-medium mb-1"
            >
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="RU"
              withCountryCallingCode
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              value={phone}
              onChange={(value) => {
                setPhone(value);
                setValue("phone", value || "");
              }}
              className="w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 bg-transparent"
            />
            <input
              type="hidden"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-transparent text-white"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-white text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-transparent text-white"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-white">
                I agree to the terms and conditions
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm">{errors.terms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mb-10 rounded-lg text-white font-medium transition duration-200 shadow-md ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
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
              "Register"
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-white">
            Do you have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <RegistrationOtpVerification
        show={openOtp}
        onClose={() => setOpenOtp(!openOtp)}
        data={formData}
      />
    </div>
  );
}