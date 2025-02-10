import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-4 border-teal-300 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Reset Password
      </h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Enter your email, and we will send you a reset link.
      </p>

      <form onSubmit={handleReset} className="mt-4 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md"
        />

        <button className="w-full bg-teal-500 text-white p-2 rounded-md">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
