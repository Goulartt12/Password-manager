const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/passwordManager").
then(()=>{
    console.log("mongo connected");
}).catch(()=>{
    console.log("connection failed");
});

const schema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    site:{
        type: String,
        required: true
    }
});

const models = mongoose.model("Users", schema);
module.exports = models;