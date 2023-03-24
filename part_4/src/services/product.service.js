import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:4242/";

const ProductService = () => {
  const getAll = async () => {
    try{
        let response = await axios.get(API_URL + "products")
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  const get = async name => {
    try{
        let response = await axios.get(API_URL + "products", { params: { name } })
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  const update = async (id, data) => {
    try{
        // TODO : refacto
        delete data.categories
        delete data['_id']
        let response = await axios.put(API_URL + "products/" + id, data, {
            headers: {
              'Authorization': `Basic ${AuthService.getCurrentUser()}`
            }
        })
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  return {
    get,
    getAll,
    update
  }
}

export default ProductService();