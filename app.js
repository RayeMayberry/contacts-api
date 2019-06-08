const express = require('express');
const app = express();
const sqlDB = require('mssql');
const config = require('./config.json');

const connection = sqlDB.connect(config);

// handle potential cors errors by providing headers.
app.use((res,req,next)=>{
    res.header('Access-Control-Allow-Origin', '*'); // maybe restrict access to my app later?
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        // allowed http requests
        res.header('Access-Control-Allow-Medthods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});


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