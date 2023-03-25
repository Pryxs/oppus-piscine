import axios from "axios";
import AuthService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL

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

  const create = async data => {
    try{
        let response = await axios.post(API_URL + "products", data, {
          headers: {
            'Authorization': `Basic ${AuthService.getCurrentUser()}`
          }
        })
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

  const remove = async id => {
    try{
        const response = await axios.delete(API_URL + "products/" + id, {
            headers: {
              'Authorization': `Basic ${AuthService.getCurrentUser()}`
            }
        })
        return response.data;
    } catch(err) {
        console.log(err.response.data)
    }
  }

  return {
    get,
    getAll,
    create,
    update,
    remove
  }
}

export default ProductService();