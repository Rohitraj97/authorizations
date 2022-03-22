const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },

    //id becoz which user has created the product
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    }

  },

  {
    timestamps: true,
    versionKey: false,
  }

)
const Product =  mongoose.model("product",productSchema )
module.exports =Product

//we are creating this product schema because to check only authenticated user can buy the product