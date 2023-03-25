import { useState } from 'react';
import ProductService from "../../services/product.service";

const ProductAdd = ({getProducts}) =>{
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await ProductService.create(formData) 
            setFormData({}) 
            getProducts() 
        } catch(err){
            console.log('Une erreur est surevenu')
        }

    }
    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom : </label>
                    <input type="text" name="name" onChange={(e) => handleChange(e)} value={formData.name || ''} required />
                </div>

                <div>
                    <label>Prix </label>
                    <input type="text" name="price" onChange={(e) => handleChange(e)} value={formData.price || ''} required />
                </div>

                <div>
                    <label>Description </label>
                    <input type="text" name="description" onChange={(e) => handleChange(e)} value={formData.description || ''} />
                </div>

                <div>
                    <input type="submit" value="Ajouter"/>
                </div>
            </form>
        </div>
    )
}

export default ProductAdd;