import {Users} from '../../models/User.js'
import {BcryptHelper} from '../../helpers/bcrypt.helper.js'

export const UserService = () => {

    const get = async properties => {   
        try{
            let user = await Users.findOne({...properties})
            return user;
        } catch(err){
            throw 'Failed to find user'
        }
    }

    const create = async data => {
        try{
            let bcryptHelper = BcryptHelper()
            let hash = bcryptHelper.encrypt(data.password)

            const {username, email} = data
            
            const newUser = new Users({
                username, 
                email,
                password : hash,
                admin : false
            })
            
            let user = await newUser.save()
            return user;
        }catch(err){
            throw 'Failed to create user';
        }
    }

    return {
        get,
        create,
    }
}