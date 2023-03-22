import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}` 
})

export const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
  },
  db:{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME
  }
}
