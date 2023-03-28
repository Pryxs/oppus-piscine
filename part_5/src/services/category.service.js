import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const CategoryService = () => {
  const getAll = async () => {
    try{
        let response = await axios.get(API_URL + "categories")
        return response.data
    } catch(err) {
        console.log(err.response.data)
    }
  }

  const create = async (data, token) => {
    try{
        let response = await axios.post(API_URL + "categories", data, {
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
      const {name } = data
      let response = await axios.put(API_URL + "categories/" + id, {
        name
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
        const response = await axios.delete(API_URL + "categories/" + id, {
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
    getAll,
    create,
    update,
    remove
  }
}

export default CategoryService();