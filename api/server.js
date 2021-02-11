// BUILD YOUR SERVER HERE
const express = require('express');
const model = require('./users/model');
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
    
})
server.post("/api/users", (req,res)=>{

})
server.get("/api/users/:id", (req,res)=>{

})
server.delete("/api/users/:id",(req,res)=>{

})
server.put("/api/users/:id",(req,res)=>{
    
})
//
module.exports = {}; // EXPORT YOUR SERVER instead of {}
