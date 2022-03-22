const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://authorization:authorization123@cluster0.hl09p.mongodb.net/authorization?retryWrites=true&w=majority");
};