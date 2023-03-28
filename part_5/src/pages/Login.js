import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { loginUser } from '../features/auth/authActions'

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

    &:nth-of-type(3){
        margin-top: 3rem;
    }
  }

  span:last-child{
    font-size: 12px;
    text-align: center;
    display: block;
    width: 100%;
  }

  .button{
    ${BaseButton}
    background-color: ${props => props.theme.dynamic};
  }

  a{
    color: ${props => props.theme.dynamic};
  }
`

const Input = styled.input`
  ${BaseInput}
`

export default function Login(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        username : 'admin',
        password : 'azerty'
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
        navigate('/')
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {errorMessage && <div>{errorMessage}</div>}

                <div>
                    <label>Username </label>
                    <Input type="text" name="username" onChange={(e) => handleChange(e)} value={formData.username} required />
                </div>

                <div>
                    <label>Password </label>
                    <Input type="password" name="password" onChange={(e) => handleChange(e)} value={formData.password} required />
                </div>

                <div>
                    <input className="button" type="submit" value="Se connecter"/>
                </div>

                <span>Pas encore de compte ? <Link to={'/register'}>Inscriez vous !</Link></span>
            </Form>
        </div>
    )
}