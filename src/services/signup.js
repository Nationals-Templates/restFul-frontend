import API from "../api/axios";

export const signup = async (userData) => {
  try {
    // Only send the required fields to match your backend
    const payload = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone
    };

    const res = await API.post("/auth/register", payload);
    
    if (res.status === 201) {
      return {
        success: true,
        data: res.data,
        message: "Registration successful!"
      };
    }
    throw new Error(res.data?.message || "Registration failed");
    
  } catch (error) {
    console.error("Signup error:", error);
    
    // Return consistent error format
    return {
      success: false,
      error: error.response?.data?.error || 
             error.response?.data?.message || 
             "Registration failed. Please try again.",
      details: error.response?.data?.details
    };
  }
};