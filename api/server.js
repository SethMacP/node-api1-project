//User Schema
// {
//   id: "a_unique_id", // String, hint: use the installed `shortid` npm package to generate it
//   name: "Jane Doe",  // String, required
//   bio: "Having fun", // String, required
// }



// BUILD YOUR SERVER HERE

//dependencies
const express = require('express');
const model = require('./users/model');
const shortid = require('shortid');


//server via express
const server = express();


server.use(express.json());



//grab all users
//working, no warnings
server.get("/api/users", (req,res)=>{
    model.find()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(()=>{
        res.status(500).json({message: "The users information could not be retrieved"})
    })
})

//create new user
//working
server.post("/api/users", async (req,res)=>{
    
    const newUser = await model.insert({
        id:shortid.generate(),
        name:req.body.name,
        bio:req.body.bio,
    })
   if(newUser.name && newUser.bio){
        res.status(201).json(newUser)
   }else{
       res.status(400).json({ message: "Please provide name and bio for the user" })
   }

})

//get user by id
//working, no warnings
server.get("/api/users/:id",  (req,res)=>{
    model.findById(req.params.id)
    .then(user=>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
    })
    .catch(()=>{
        res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

//delete user by id
//working, no warnings!
server.delete("/api/users/:id",  (req , res) => {

    model.remove(req.params.id)
        .then( user => {
            if(user){
                res.status(200).json({...user,
                message: `${user.name} has been deleted`})
            }else{
                res.status(400).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(()=>{
            res.status(500).json({ message: "The user could not be removed" })
        })
})
//edit user by id
//working, no warnings
server.put("/api/users/:id",(req,res)=>{
   if(req.body.name && req.body.bio){
        model.update(req.params.id, req.body)  
            .then(user => {
                user
                    ? res.status(200).json(user)
                    : res.status(404).json({message: 'The user with the specified ID does not exist.'})
            })
            .catch(()=>{
                res.status(500).json({message: "The user could not be updated." })
            })
   }else if(req.body.name || req.body.bio){
       res.status(400).json({message: "Please provide name and bio for the user"})
   }
})
//
module.exports = server; // EXPORT YOUR SERVER instead of {}
