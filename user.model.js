
const mongoose = require("mongoose")

const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name :  { type: String, required: true},
    email: { type: String, required: true, unique: true },
   
    password: { type: String, required: true }
},
    {
        timestamps: true,
        versionKey: false,
    }
)

//while creating password we will encrypt/hatched it,  here this.password=plain text nad second argument= 8 means this much time we will hashed it
userSchema.pre("save", function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
    // this will return to  auth.controller
})


//at the time of login for matching password because we have already hatched it , so we will check it here ,if password match or not
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user", userSchema)

module.exports = User;


