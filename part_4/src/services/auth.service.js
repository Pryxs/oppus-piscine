import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const AuthService = () => {
  const login = async formData => {
    let response = await axios.post(API_URL + "login", {
      ...formData
    })

    if(response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data
    }

    console.log("Pas de token dans la réponse")
  }

  const logout = () => {
    localStorage.removeItem("user");
  }

  const getUserPermission = async () => {
    const token = getCurrentUser()
    const response = await axios.post(API_URL + "login/decrypt", {
      token
    })
    return response.data
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
  }

  return {
    login,
    logout,
    getUserPermission,
    getCurrentUser,
  }
}

export default AuthService();