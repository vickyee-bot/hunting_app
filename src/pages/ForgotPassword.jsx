import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://rentalke-server-2.onrender.com/api/v1/manager/forgot-password",
        { email }
      );

      if (response.data.success) {
        setMessage("Password reset OTP sent. Check your email.");

        // Redirect to reset password page after 2 seconds
        setTimeout(() => {
          navigate("/reset-password", { state: { email } }); // Pass email to next page
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Forgot Password
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your email to receive a password reset OTP.
      </p>

      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="w-full p-3 border border-teal-300 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-md font-bold hover:bg-teal-600"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
