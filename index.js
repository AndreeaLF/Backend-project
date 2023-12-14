const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const exp = require('constants');
const collection = require("./src/config");


const app = express();

app.use(express.json());


app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.post("/signup", async (req, res) => {
const data = {
    name: req.body.username,
    password: req.body.password
}
// user verifizierung

const existUser = await collection.findOne({name: data.name});

if(existUser) {

    res.send("User already exist. Please choose a different username.");
}else {

    // hash versuch mit bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword //ersetzen with original passw

    const userdata = await collection.insertMany(data);
    console.log(userdata);
}

});

// login

app.post("/login", async (req,res) => {
try{
const check = await collection.findOne({name: req.body.username});
if(!check) {
    res.send("user name cannot be found");
}

//hash pass compare
const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
if(isPasswordMatch) {
    res.render("home");
}else{
    req.send("password is wrong");
}
}catch{
res.send("wrong details");
}
});


const port = 3000;

app.listen(port, () => {

    console.log(`Server running on Port:  ${port}`);
});

