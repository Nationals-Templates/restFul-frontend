// services/login.js
import API from "../api/axios";

export const login = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });

    if (res.status === 200 && res.data) {
      const { token, user, message } = res.data;

      // Store the user and token separately if needed
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        data: {
          token,
          user,
          message,
        },
      };
    } else {
      return {
        success: false,
        error: res.data?.error || "Login failed",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.",
    };
  }
};
