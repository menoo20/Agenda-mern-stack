const mongoose = require("mongoose");




const ReviewSchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength: [100, "Please Add a Title"], trim: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Every review must have a user"]},
    productId: {type: String },
    text: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, required: [true, "Please add a rating between 1 and 5"]}
},{timestamps: true});




ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });



const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review;