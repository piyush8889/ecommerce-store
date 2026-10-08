import app from "./app.js"
import {connectMongoDB} from "./db/connection.js"

connectMongoDB(process.env.DB_URI)
  .then(()=> {
        app.listen(process.env.PORT || 8000 , () => {
            console.log(`Server started at ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log("Database connection error",error)
        process.exit(1)
    }) 