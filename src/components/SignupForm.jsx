import { useState } from "react";
import googleIcon from "../assets/devicon_google.svg";
import facebookIcon from "../assets/logos_facebook.svg";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="./login" className="text-blue-500">
          Log in
        </a>
      </p>

      <form className="mt-4 space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="w-1/2 p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="w-1/2 p-2 border border-teal-300 rounded-md"
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="+254 Enter your phone number"
          className="w-full p-2 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create password"
          className="w-full p-2 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="w-full p-2 border border-teal-300 rounded-md"
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="termsAccepted" onChange={handleChange} />
          I agree to the{" "}
          <a href="#" className="text-blue-500">
            Terms & Conditions
          </a>
        </label>

        <button className="w-full bg-teal-500 text-white p-2 rounded-md">
          Create account
        </button>

        <div className="text-center text-gray-500">Or register with</div>

        <div className="flex gap-3">
          <button className="w-1/2 flex items-center justify-center p-2 border border-teal-300 rounded-md">
            <img src={googleIcon} alt="Google" className="w-5 mr-2" />
            Google
          </button>
          <button className="w-1/2 flex items-center justify-center p-2 border border-teal-300 rounded-md">
            <img src={facebookIcon} alt="Facebook" className="w-5 mr-2" />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
