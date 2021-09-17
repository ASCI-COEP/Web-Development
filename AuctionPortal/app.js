const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/",function(req,res){
  res.render("Landing");
});
app.get("/register",function(req,res){
  res.render("Register",{err:""});
});
app.get("/login",function(req,res){
  res.render("Login");
});
app.post("/signin",function(req,res){
  p=req.body.pwd;
  cp=req.body.cpwd;
  if(p===cp){
    res.render("Login");
  }
  else{
    res.render("Register",{err:"**Passwords don't match"});
  }

});
app.post("/marketplace",function(req,res){
  res.render("Marketplace");
});
app.get("/product2",function(req,res){
  res.render("product2");
});
app.get("/product3",function(req,res){
  res.render("product3");
});
app.get("/product4",function(req,res){
  res.render("product4");
});
app.get("/logo",function(req,res){
  res.redirect("/");
});
app.get("/about",function(req,res){
  res.redirect("/#about");
});
app.get("/newsfeed",function(req,res){
  res.redirect("/#schedule");
});
app.get("/faq",function(req,res){
  res.redirect("/#faq");
});
app.get("/contact",function(req,res){
  res.redirect("/#contact");
});
app.post("/order",function(req,res){
  console.log("Your bid has been placed successfully");
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("On port 3000");
});
