import {UserService} from '../user/user.service.js'
import {BcryptHelper} from '../../helpers/bcrypt.helper.js'
import {JwtHelper} from '../../helpers/jwt.helper.js'

export const AuthService = () => {

    const login = async data => {
        const userService = UserService()
        const user = await userService.get({"username" : data.username})

        const bcryptHelper = BcryptHelper()
        const match = bcryptHelper.decrypt(data.password, user.password)

        if(match){
            const {username, email} = user
            const jwtHelper = JwtHelper()
            const jwt = jwtHelper.signJWT({username, email})

            return jwt;
        }

        throw 'Password or Username incorect'
    }


    return {
        login,
    }
}