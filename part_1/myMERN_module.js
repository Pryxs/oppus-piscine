const fs = require('fs');

module.exports = {
    create: (name) => {
        fs.appendFile(`./part_1/resources/${name}.txt`, '', (err) => {
            if (err) throw err;
            console.log(name + ' created')
            return 'OK'
        });
    },
    read: (name) => {
        fs.readFile(`./part_1/resources/${name}.txt`, "utf8", (err, data) => {
            if (err) throw err;
            console.log(data)
        });    
    },
    update: (name, content) => {
        fs.writeFile(`./part_1/resources/${name}.txt`, content, (err) => {
            if (err) throw err;
            console.log(name + ' updated')
        });
    },
    delete: (name) => {
        fs.unlink(`./part_1/resources/${name}.txt`, (err) => {
            if (err) throw err;
            console.log(name + ' deleted')
        });
    },
}