import API from "../api/axios"

export const signup = async (email, password) => {
    try {
        const res = await API.post("/auth/register", {email, password});
        alert("Signup went successfully")
        window.location.replace("/login")
    } catch(error) {
        alert("Signup failed!")
    }
}