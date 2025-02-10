import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://rentalke-api.onrender.com/api/auth/reset-password",
        formData
      );

      if (response.data.success) {
        setMessage("Password reset successful. You can now log in.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Reset Password
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your email, OTP, and new password.
      </p>

      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
          required
        />

        {/* OTP */}
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
          required
        />

        {/* New Password */}
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-md font-bold hover:bg-teal-600"
          disabled={loading}
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
