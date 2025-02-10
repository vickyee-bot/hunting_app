import { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/devicon_google.svg";
import facebookIcon from "../assets/logos_facebook.svg";
import {
  signup,
  verifyOtp,
  requestNewOtp,
  googleAuth,
  facebookAuth,
} from "../utilities/api";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Signup, Step 2: OTP verification
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      role: "MANAGER",
    });

    setMessage(response.message);
    if (response.success) {
      setStep(2); // Move to OTP verification
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await verifyOtp(formData.email, otp);
    setMessage(response.message);

    if (response.success) {
      alert("Account verified! You can now log in.");
      navigate("/login"); // ✅ Redirects to the login page
    }

    setLoading(false);
  };

  const handleRequestNewOtp = async () => {
    setLoading(true);
    const response = await requestNewOtp(formData.email);
    setMessage(response.message);
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    try {
      window.location.href =
        "https://rentalke-api.onrender.com/api/auth/google";
    } catch (error) {
      setMessage("Google authentication failed. Please try again.");
    }
  };

  const handleFacebookAuth = async () => {
    try {
      window.location.href =
        "https://rentalke-api.onrender.com/api/auth/facebook";
    } catch (error) {
      setMessage("Facebook authentication failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">
        {step === 1 ? "Create an account" : "Verify OTP"}
      </h2>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="./login" className="text-blue-500">
          Log in
        </a>
      </p>

      {message && <p className="text-red-500">{message}</p>}

      {step === 1 ? (
        <form className="mt-4 space-y-3" onSubmit={handleSignup}>
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="w-1/2 p-2 border border-teal-300 rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="w-1/2 p-2 border border-teal-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="+254 Enter your phone number"
            className="w-full p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            className="w-full p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
            required
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={handleChange}
              required
            />
            I agree to the{" "}
            <a href="#" className="text-blue-500">
              Terms & Conditions
            </a>
          </label>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Create account"}
          </button>
        </form>
      ) : (
        <form className="mt-4 space-y-3" onSubmit={handleVerifyOtp}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full p-2 border border-teal-300 rounded-md"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            className="w-full text-blue-500 mt-2"
            onClick={handleRequestNewOtp}
            disabled={loading}
          >
            Request New OTP
          </button>
        </form>
      )}

      <div className="text-center text-gray-500 mt-4">Or register with</div>

      <div className="flex gap-3">
        <button
          onClick={handleGoogleAuth}
          className="w-1/2 flex items-center justify-center p-2 border border-teal-300 rounded-md"
        >
          <img src={googleIcon} alt="Google" className="w-5 mr-2" />
          Google
        </button>
        <button
          onClick={handleFacebookAuth}
          className="w-1/2 flex items-center justify-center p-2 border border-teal-300 rounded-md"
        >
          <img src={facebookIcon} alt="Facebook" className="w-5 mr-2" />
          Facebook
        </button>
      </div>
    </div>
  );
}
