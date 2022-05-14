const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String,required: true },
    images: {type: Array, required: [true, "please insert at least one image"]},
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    unit: {
     type: String, required: [true, "please add a unit to your product"],
     enum: ['kilo', 'litre', 'packet', 'sachet', 'carton', 'bag', 'bar', 'package', "jar"]
    },
    isFeatured: {type: Boolean, default: true},
    price: {type: Number, required: true},
},{timestamps: true})

ProductSchema.pre("remove", async function (next) {
    await this.model("Review").deleteMany({ productId: this._id });
  
    next();
  });
  
  ProductSchema.virtual("Reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "productId",
    justOne: false,
  });



module.exports = mongoose.model("Product", ProductSchema)