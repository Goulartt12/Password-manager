const express = require("express");
const app = express();
const models = require("./mongodb");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", (req,res)=>{
    models.find({}).then(
        result =>{res.json(result)
    }).catch(
        err =>{res.json(err)
    });
});

app.post("/createUser", async (req,res)=>{
    const user = req.body;
    const newUser = new models(user);
    await newUser.save();
    res.json(user);
});

app.delete("/deleteUser/:email", async (req,res)=>{
    const email = req.params.email;
    await models.deleteOne({email: email});
    res.json("user deleted");
});

app.put("/updateUser/:email", async (req,res)=>{
    const data = {
        email: req.body.email,
        password: req.body.password,
        site: req.body.site
    };
    await models.updateOne({email: req.params.email}, data);
    res.json("User updated");
});

app.listen(5000,()=>{
    console.log("connected");
});