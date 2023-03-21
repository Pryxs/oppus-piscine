import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const myMERN_module = () => {
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    const create = (name) => {
        fs.appendFileSync(`${dirname}/resources/${name}.txt`, '')
    }

    const read = (name) => {
        fs.readFileSync(`${dirname}/resources/${name}.txt`, "utf8");    
    }

    const update = (name, content) => {
        fs.writeFileSync(`${dirname}/resources/${name}.txt`, content);
    }

    const remove = (name) => {
        fs.unlinkSync(`${dirname}/resources/${name}.txt`);
    }

    return {
        create,
        read,
        update,
        remove
    }
}

