const express = require('express');
const app = express();

// ROUTES - respond to requests for a given url with... something.
app.get("/", (req, res)=>{
    console.log("Getting root");
    res.send("Got root");
});
app.get("/contacts", (req, res)=>{
    console.log("Getting contacts");
    res.send("This will be replaced with data later"); 
})

app.listen(1234,()=>{
    console.log("Server is listening on localhost:1234")
});