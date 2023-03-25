import { useState } from 'react';
import CategoryService from "../../services/category.service";

const CategoryAdd = ({getCategories}) =>{
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await CategoryService.create(formData) 
            setFormData({}) 
            getCategories() 
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
                    <input type="submit" value="Ajouter"/>
                </div>
            </form>
        </div>
    )
}

export default CategoryAdd;