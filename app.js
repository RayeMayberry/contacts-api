const express = require('express');
const app = express();
const sqlDB = require('mssql');
const config = require('./config.json');

const connection = sqlDB.connect(config);

// ROUTES - respond to requests for a given url with... something.
app.get("/", (req, res)=>{
    console.log("Getting root");
    res.send("Got root");
});
app.get("/contacts", (req, res)=>{
    console.log("Getting contacts");
    sqlDB.connect(config, ()=>{
        const request = new sqlDB.Request();
        request.query("SELECT * FROM Contacts", (err, recordset)=>{
            if (err) console.log(err);
            res.end(JSON.stringify(recordset));
        });
    });
})

app.listen(1234,()=>{
    console.log("Server is listening on localhost:1234")
});