require('dotenv').config()

const env = process.env.NODE_ENV;
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT
const db_name = process.env.DB_NAME

const DEVELOPMENT = {
  app: {
      host: 'localhost',
      port: 4242
  },
  db:{
    host: db_host,
    port: db_port,
    name: db_name
  }
};

const config = {
  DEVELOPMENT,
};

module.exports = config[env];
