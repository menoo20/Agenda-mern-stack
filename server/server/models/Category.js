const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: [true, "Please insert A category name"], unique: [true, "This category already exists"]}
}, {timestamps: true})

module.exports = mongoose.model("Category", CategorySchema);