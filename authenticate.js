require("dotenv").config();
const jwt = require("jsonwebtoken")


//function to verify whether generated token is correct or not
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return reject(err)

            return resolve(decoded)
        });
    })

}

const authenticate = async (req, res, next) => {
      console.log("rohit")
    //to access headers  if in headers if there is no authorization then show error
    if (!req.headers.authorization)
        return res.status(400).send({ message: "Authorization token not found or incorrect" })


        //if authorization has not bearer with sapce then show error
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({ message: "Authorization token not found or incorrect" })

        //if everything is correct then generate token for buy product,beacuse authorization is array
    const token = req.headers.authorization.trim().split(" ")[1]


    //verify token whether it is correct or not ,so i am calling verify token function and decode token
    let decoded;
    try {
        decoded = await verifyToken(token)
       
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ message: "Authorization token not found or incorrect" })
    }

    console.log(decoded)

    req. user_id = decoded.user._id;

    return next();

}

module.exports = authenticate;


//it authenticate whether user is signed in or not, if signed in and authentication is correct then give him token