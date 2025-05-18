import API from "../api/axios";

export const verifyOtp = async (otp, email) => {
  try {
    const res = await API.post('/auth/verify-otp', { otp, email });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message ,
    };
  }
};
