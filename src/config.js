const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://andreealf:mongooseproject@cluster0.wqq8cjx.mongodb.net/Authentication")

connect.then(() => {

    console.log("Database connected successfully");
}).catch((err) => {
    console.log("Database cannot be connected", err);
});

const LoginSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;