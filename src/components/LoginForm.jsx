import { useState } from "react";
import axios from "axios";
import googleIcon from "../assets/devicon_google.svg";
import facebookIcon from "../assets/logos_facebook.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "MANAGER",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://rentalke-server-2.onrender.com/api/v1/manager/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      console.log("API Response:", response.data); // Debug API response

      if (response.data.success) {
        login(response.data.token, response.data.user); // ✅ Fix: Swap order

        // Redirect to the dashboard after login
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Example: Redirect to your backend for Google OAuth
      window.location.href =
        "https://rentalke-api.onrender.com/api/v1/auth/google";
    } catch (error) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleFacebookAuth = async () => {
    try {
      // Example: Redirect to your backend for Facebook OAuth
      window.location.href =
        "https://rentalke-api.onrender.com/api/v1/auth/facebook";
    } catch (error) {
      setError("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Hello, welcome back!
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your details to access your account
      </p>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email / Phone */}
        <input
          type="text"
          name="email"
          placeholder="Enter email..."
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
        {/* role */}
        {/* <input
          type="text"
          name="role"
          value="MANAGER"
          placeholder="Enter your password..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
        /> */}
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
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password
          </a>
        </div>
        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-md font-bold hover:bg-teal-600"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {/* Sign In with Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center p-3 border border-teal-300 rounded-md font-semibold hover:bg-gray-100"
        >
          <img src={googleIcon} alt="Google" className="w-5 mr-2" />
          Sign In with Google
        </button>
        {/* Sign In with Facebook */}
        <button
          type="button"
          onClick={handleFacebookAuth}
          className="w-full flex items-center justify-center p-3 border border-teal-300 rounded-md font-semibold hover:bg-gray-100"
        >
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
