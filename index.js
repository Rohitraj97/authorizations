const express = require("express");
const connect = require("./configs/db");
//importing usercontroller
const userController = require("./controllers/user.controllers")
const productController = require("./controllers/product.controllers")

const {register,login} =require("./controllers/auth.controllers")


const app = express()


app.use(express.json())
app.use("/products", productController)
// user route
app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.listen(5000,async() => {
    try{
        await connect()
        
console.log("r")
        console.log("listening on port 5000")
    }
    catch(err)
    {
        console.log(err.message)
    }
})