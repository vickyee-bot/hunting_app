import { useState } from "react";
import googleIcon from "../assets/devicon_google.svg";
import facebookIcon from "../assets/logos_facebook.svg";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Hello, welcome back!
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your details to access your account
      </p>

      <form className="space-y-4">
        {/* Email / Phone */}
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Enter email or phone number..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={handleChange}
              className="cursor-pointer border-teal-300 border"
            />
            Remember me
          </label>
          <a href="./reset-password" className="text-blue-500 hover:underline">
            Forgot Password
          </a>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-teal-500 text-white p-3 rounded-md font-bold hover:bg-teal-600">
          Sign In
        </button>

        {/* Sign In with Google */}
        <button className="w-full flex items-center justify-center p-3 border border-teal-300 rounded-md font-semibold hover:bg-gray-100">
          <img src={googleIcon} alt="Google" className="w-5 mr-2" />
          Sign In with Google
        </button>

        {/* Sign In with Facebook */}
        <button className="w-full flex items-center justify-center p-3 border border-teal-300 rounded-md font-semibold hover:bg-gray-100">
          <img src={facebookIcon} alt="Facebook" className="w-5 mr-2" />
          Sign In with Facebook
        </button>
      </form>

      {/* Signup Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t already have an account?{" "}
        <a href="./signup" className="text-blue-500 hover:underline">
          Signup.
        </a>
      </p>
    </div>
  );
}
