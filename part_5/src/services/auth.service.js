import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const AuthService = () => {
  const login = async formData => {
    let response = await axios.post(API_URL + "login", {
      ...formData
    })

    if(response.data) return response.data

    console.log("Pas de token dans la réponse")
  }

  const register = async formData => {
    let response = await axios.post(API_URL + "register", {
      ...formData
    })

    return response;
  }

  const getUserPermission = async token => {
    const response = await axios.post(API_URL + "login/decrypt", {
      token
    })
    return response.data
  }


  return {
    login,
    register,
    getUserPermission,
  }
}

export default AuthService();