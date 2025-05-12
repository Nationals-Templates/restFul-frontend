import API from "../api/axios"

export const login = async (email, password) => {

  try {
    const res = await API.post("/auth/login", {email, password})
    alert("Logged in successfully")
    localStorage.setItem("user", JSON.stringify(res.data))
    window.location.replace("/dashboard")
    
  } catch(error) {
    alert("Login failed!")
  }
}
