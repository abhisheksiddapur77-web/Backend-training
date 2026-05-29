const express= require("express");
var cors = require('cors')

const app= express();
app.use(cors())
const mongoose= require("mongoose")
require("dotenv").config()
const port= process.env.port

const {createAccount,login}=require("./cotrollers/user")
const{createCar,getAllCars,getCarById,updateCar,deleteCar}=require("./cotrollers/cars")
const auth=require("./middleware/auth")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form action="/signin" method="POST">
      <div>
        <label>Name</label><br />
        <input name="name" placeholder="Name" required />
      </div>
      <div>
        <label>Email</label><br />
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" name="password" placeholder="Password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? Go to <a href="/login">Login</a>.</p>
  `);
});

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <div>
        <label>Email</label><br />
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" name="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? Go to <a href="/">Register</a>.</p>
  `);
});

app.post("/signin",createAccount);
app.post("/login",login);
app.post("/createCar",createCar);
app.get("/allCars",getAllCars);
app.get("/car/:id",getCarById);
app.put("/updateCar/:id",updateCar);
app.delete("/deleteCar/:id",deleteCar);



mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("Database is connected")
    app.listen(port,()=>{
    console.log(`server is running is port number ${port}`);
});
})
.catch((e)=>{
    console.log("something went wrong",e)
  })