import bcrypt from 'bcrypt'

export const BcryptHelper = () => {
    const SALT_ROUNDS = 10

    const encrypt = password => {
        return bcrypt.hashSync(password, SALT_ROUNDS, (err, hash) => {
            if(err) throw err

            return hash
        })  
    }

    const decrypt = (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }

    return {
        encrypt,
        decrypt
    }
}