import { server } from './server'
import dotenv from 'dotenv'

const envConfig = dotenv.config()

if (envConfig.error) {
  throw envConfig.error
}

const PORT = process.env.PORT


server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})