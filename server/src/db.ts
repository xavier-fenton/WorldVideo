
import { MongoClient, ServerApiVersion } from "mongodb"
import dotenv from 'dotenv'

const envConfig = dotenv.config()

if (envConfig.error) {
  throw envConfig.error
}

export const db = async () => {
    const uri = process.env.MONGO_DB_URI as string;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    const db = client.db("sample_mflix")
    const collection = db.collection("movies")
    

    return {
        getTest: async () => {
            try {
                
               const result = collection.find({})
               return result
            } catch (error) {
               
                    console.error(error)
                    console.trace()
                }
            }
            
        }
    }








