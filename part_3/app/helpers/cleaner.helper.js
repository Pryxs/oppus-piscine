import jwt from 'jsonwebtoken';

const Cleaner = () => {
    const cleanObj = (obj) => {
        for (var propName in obj) {
            if (obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj
    }

    return {
        cleanObj,
    }
}

export const cleaner = Cleaner()