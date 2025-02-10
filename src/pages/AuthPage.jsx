import { useState } from "react";

export default function AuthPage() {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Verify Your Account
      </h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Enter the OTP sent to your email.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded-md text-center"
        />

        <button className="w-full bg-teal-500 text-white p-2 rounded-md">
          Verify OTP
        </button>
      </form>
    </div>
  );
}
