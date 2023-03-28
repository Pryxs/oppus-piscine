import { useState } from 'react'
import styled from '@emotion/styled'
import {BaseInput} from '../../styles/BaseInput'
import {BaseButton} from '../../styles/BaseButton'

const Form = styled.form`
    display: flex;
    gap: .5rem;
    align-items: flex-end;

    div{
        label{
            margin-bottom: .3em;
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

const CategoryAdd = ({handleCreateCategory}) =>{
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleCreateCategory(formData)
        setFormData({})
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