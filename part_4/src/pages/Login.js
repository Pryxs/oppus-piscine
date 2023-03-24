import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

export default function Login(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        username : 'user',
        password : 'azerty'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await AuthService.login(formData)   
            props.setIsLogged()
            navigate('/')
        } catch(err){
            setErrorMessage('Nom de compte ou mot de passe incorrect')
            console.log('Une erreur est surevenu')
        }

    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                {errorMessage && <div>{errorMessage}</div>}

                <div>
                    <label>Username </label>
                    <input type="text" name="username" onChange={(e) => handleChange(e)} value={formData.username} required />
                </div>

                <div>
                    <label>Password </label>
                    <input type="password" name="password" onChange={(e) => handleChange(e)} value={formData.password} required />
                </div>

                <div>
                    <input type="submit" value="Envoyer"/>
                </div>
            </form>
        </div>
    )
}