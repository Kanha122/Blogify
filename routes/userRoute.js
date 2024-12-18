const express=require("express");
const router=express.Router();
const { registeredUser, loginUser, logout }=require("../controllers/authController");


router.post("/register", registeredUser);
router.post("/login", loginUser);


router.get("/signin", function(req, res){
    res.render("signin");
});

router.get("/signup", function(req, res){
    res.render("signup");
});

router.get("/logout",logout);


module.exports=router;