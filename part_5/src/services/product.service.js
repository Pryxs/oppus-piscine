import axios from "axios";

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

  const create = async (data, token) => {
    try{
        let response = await axios.post(API_URL + "products", data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  const update = async (id, data, token) => {  
    try{
        const {name, price, description} = data
        const categories = data.categories.map(category => category['_id'])
        const response = await axios.put(API_URL + "products/" + id, {
          name,
          price,
          description,
          categories
        }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }
  

  const remove = async (id, token) => {
    try{
        const response = await axios.delete(API_URL + "products/" + id, {
            headers: {
              'Authorization': `Bearer ${token}`
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