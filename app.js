const express=require("express");
const app=express();
const db=require("./config/mongoose-connection");
const cookieParser=require("cookie-parser");
const path=require("path");
const userRouter=require("./routes/userRoute");
const postRouter=require("./routes/postRoute");
const exp = require("constants");
const {isLoggedIn}=require("./middleware/islogin");



require("dotenv").config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/user", userRouter);
app.use("/post", postRouter);


app.get("/",isLoggedIn ,function(req, res){
    res.render("home", {user:req.user});
});

app.listen(3000, ()=>{
    console.log("listen to the server..");
});