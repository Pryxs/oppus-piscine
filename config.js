require('dotenv').config()

const env = process.env.NODE_ENV;

const DEVELOPMENT = {
 app: {
  host: 'localhost',
   port: 4242
 },
};

const config = {
  DEVELOPMENT,
};

module.exports = config[env];
