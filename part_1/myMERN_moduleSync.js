const fs = require('fs');

module.exports = {
    create: (name) => {
        fs.appendFileSync(`./part_1/resources/${name}.txt`, '')
    },
    read: (name) => {
        fs.readFileSync(`./part_1/resources/${name}.txt`, "utf8");    
    },
    update: (name, content) => {
        fs.writeFileSync(`./part_1/resources/${name}.txt`, content);
    },
    delete: (name) => {
        fs.unlinkSync(`./part_1/resources/${name}.txt`);
    },
}