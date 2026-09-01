const  app = require("./app")
const { connectMongoDB } = require("./db/connection")

connectMongoDB(process.env.DB_URI)
  .then(()=> {
        app.listen(process.env.PORT || 8000 , () => {
            console.log(`Server started at ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log("Database connection error",error)
        process.exit(1)
    }) 