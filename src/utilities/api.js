import axios from "axios";

axios.defaults.baseURL = "https://rentalke-api.onrender.com/api/auth";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Signup Request
export const signup = async (userData) => {
  try {
    const response = await axios.post("/signup", userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Signup failed" };
  }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post("/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "OTP verification failed",
      }
    );
  }
};

// Request a new OTP
export const requestNewOtp = async (email) => {
  try {
    const response = await axios.post("/request-new-otp", { email });
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Failed to request new OTP",
      }
    );
  }
};

// Google Authentication (Send token from frontend)
export const googleAuth = async (googleToken) => {
  try {
    const response = await axios.post("/google", { token: googleToken });

    // Store token in localStorage for persistence
    if (response.data.success) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Google authentication failed",
      }
    );
  }
};

// Facebook Authentication (Send token from frontend)
export const facebookAuth = async (facebookToken) => {
  try {
    const response = await axios.post("/facebook", { token: facebookToken });

    // Store token in localStorage for persistence
    if (response.data.success) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Facebook authentication failed",
      }
    );
  }
};
