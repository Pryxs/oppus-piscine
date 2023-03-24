import {UserService} from '../user/user.service.js'
import {BcryptHelper} from '../../helpers/bcrypt.helper.js'
import {JwtHelper} from '../../helpers/jwt.helper.js'

const jwtHelper = JwtHelper()

export const AuthService = () => {

    const login = async data => {
        const userService = UserService()
        const user = await userService.get({"username" : data.username})

        const bcryptHelper = BcryptHelper()
        const match = bcryptHelper.decrypt(data.password, user.password)

        if(match){
            const {username, email, admin} = user
            const jwt = jwtHelper.signJWT({username, email, admin})

            return jwt;
        }

        throw 'Password or Username incorect'
    }

    const isAdmin = async jwt => {
        return jwtHelper.decodJWT(jwt).admin
    }


    return {
        login,
        isAdmin
    }
}