import axios from "axios";

const API_URL = "http://localhost:4242/";

const CategoryService = () => {
  const getAll = async () => {
    try{
        let response = await axios.get(API_URL + "categories")
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  return {
    getAll,
  }
}

export default CategoryService();