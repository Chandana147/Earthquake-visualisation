const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const data = new Schema({
    DateTime:String,
    Region:String,
    Magnitude:String,
    Latitude:String,
    Longtitude:String,
})

module.exports = earthquake = mongoose.model("earthquake", data)