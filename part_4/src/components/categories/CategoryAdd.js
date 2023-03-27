import { useState } from 'react'
import CategoryService from "../../services/category.service"

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
            <Form onSubmit={handleSubmit}>
                <div>
                    <label>Nom : </label>
                    <Input type="text" name="name" onChange={(e) => handleChange(e)} value={formData.name || ''} required />
                </div>

                <div>
                    <InputSubmit type="submit" value="+"/>
                </div>
            </Form>
        </div>
    )
}

export default CategoryAdd;