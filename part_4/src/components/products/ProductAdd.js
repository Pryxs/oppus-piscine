import { useState } from 'react';
import ProductService from "../../services/product.service";

import styled from '@emotion/styled'
import {BaseInput} from '../../styles/BaseInput'
import {BaseButton} from '../../styles/BaseButton'

const Form = styled.form`
display: flex;
gap: 2rem;
align-items: flex-end;

    div{
        label{
            margin-bottom: .5em;
            display: block;
        }

        &:last-child{

        }
    }
`

const Input = styled.input`
  ${BaseInput}
`

const InputSubmit = styled.input`
  ${BaseButton}
  background-color: ${props => props.theme.dynamic};
  padding: .5em 1em;
`

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
            <Form onSubmit={handleSubmit}>
                <div>
                    <label>Nom </label>
                    <Input type="text" name="name" onChange={(e) => handleChange(e)} value={formData.name || ''} required />
                </div>

                <div>
                    <label>Prix </label>
                    <Input type="text" name="price" onChange={(e) => handleChange(e)} value={formData.price || ''} required />
                </div>

                <div>
                    <label>Description </label>
                    <Input type="text" name="description" onChange={(e) => handleChange(e)} value={formData.description || ''} />
                </div>

                <div>
                    <InputSubmit type="submit" value="+"/>
                </div>
            </Form>
        </div>
    )
}

export default ProductAdd;