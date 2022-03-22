
const User = require("../model/user.model")
 

// import jsonweb token
const jwt = require("jsonwebtoken")


//for token we need some key,//process.env.SECRET_KEY
const generateToken = (user) => {
    return jwt.sign({user},"masaisecretkey")
}
// process.env.SECRET_KEY


//register
const register = async (req, res) => {
    try {
        //we can not signup by using same email for more than one time. One email can be used for sign-up for one time
        //whatever email we input this input-email(req.body.email)  will be checked from the collection
        let user = await User.findOne({ email: req.body.email })


        //if email already exist then send email alredy exist
        if (user) {
            return res.status(400).send({ messgae: "email already exist" })
        }


        //if email not exist then create new one , it will go to req.body to register for new user
        //here we need to put password and password should not be like plain text otherwise user can easily get this so we need to hatch or encrypt it
        // so in user model at the time of creating we hatched it ,go to user model 
        user = await User.create(req.body)

        //token generate
        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch (err) {
        res.status(400).send({ message: err.message })
    }
}


//login
const login = async (req, res) => {
    try {
        //find the email by which user has registered
        const user = await User.findOne({ email: req.body.email })


        //afetr register user come for login ,we check with which email he has registered, if same email not exist, then show wrong email
        if (!user) {
            return res.status(400).send("wrong Email")
        }


        // if email exist ,then match password,,for matchpassword we are calling a function checkPassword,go to user model for this
        //that checked password is called at checkpassword and stored in match
        const match = user.checkPassword(req.body.password)

        // if password not matched then show error wrong password
        if (!match) {
            return res.status(400).send({ message: "Wrong password" })
        }

        //if password macthed then send token
        const token = generateToken(user)
        return res.status(200).send({user, token});

    }
    catch (err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = {register,login}