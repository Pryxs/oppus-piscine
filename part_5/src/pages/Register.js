import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authActions'

import styled from '@emotion/styled'
import {BaseInput} from '../styles/BaseInput'
import {BaseButton} from '../styles/BaseButton'

const Form = styled.form`
  background-color: ${props => props.theme.primary};
  width: 300px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  padding: 2rem;
  border-radius: 5px;

  &>div{
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin-bottom: 1rem;

    &:nth-of-type(4){
        margin-top: 3rem;
    }
  }

  .button{
    ${BaseButton}
    background-color: ${props => props.theme.dynamic};
  }
`

const Input = styled.input`
  ${BaseInput}

`

export default function Register(props) {
    const [formData, setFormData] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(register(formData))
        navigate('/login')
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <Input type="text" name="username" onChange={(e) => handleChange(e)} value={formData.username || ''} required />
                </div>

                <div>
                    <label>Email </label>
                    <Input type="email" name="email" onChange={(e) => handleChange(e)} value={formData.email || ''} required />
                </div>


                <div>
                    <label>Password </label>
                    <Input type="password" name="password" onChange={(e) => handleChange(e)} value={formData.password || ''} required />
                </div>

                <div>
                    <input className="button" type="submit" value="S'inscrire"/>
                </div>
            </Form>
        </div>
    )
}