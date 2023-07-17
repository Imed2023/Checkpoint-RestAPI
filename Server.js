import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import users from "./models/User.js";

dotenv.config({path: './config/.env'})



const uri = process.env.URI
const app=express()



    app.get('/', function(req, res){  res.end('Hello World');  });

    mongoose.connect(uri, {
        dbName:"imed",
    }).then(
        () => {
            
          console.log("Connected To DB");

          app.listen(3000,function(req,res){

            console.log("Server is started on port 3000");
            
            });
        
        })

        app.get("/users", async (req, res) => {
        const allusers = await users.find();
        return res.status(200).json(allusers);
        });

        app.post("/adduser", async (req, res) => {
            const newUser = new users({
                name: "Mohamed El ayeb",
                age: 25,
            });
            const insertedUser = await newUser.save();
            return res.status(201).json(insertedUser);
          });
          app.put("/users/:id", async (req, res) => {
            try {
                const userToUpdate = await users.findOne({ _id: req.params.id })
        
                userToUpdate.age = 30
            
        
        
                await userToUpdate.save()
                res.send(userToUpdate)
            } catch {
                res.status(404)
                res.send({ error: "user doesn't exist!" })
            }
        });

        app.delete("/users/:id", async (req, res) => {
            try {
                await users.deleteOne({ _id: req.params.id })
                res.status(204).send()
            } catch {
                res.status(404)
                res.send({ error: "user doesn't exist!" })
            }
        });


