const express = require('express');
const app = express();
const sqlDB = require('mssql');
const config = require('./config.json');

const connection = sqlDB.connect(config);
sqlDB.close()

// ROUTES - respond to requests for a given url with... something.
function route(endpoint){
    app.get(`/${endpoint}`, (req, res)=>{
        if (endpoint !== "") {
            sqlDB.connect(config, ()=>{
                const request = new sqlDB.Request();
                request.query(`SELECT * FROM ${endpoint}`, (err, result)=>{
                    if (err) console.log(err);
                    res.send(result.recordset);
                });
            })
        }
        else res.send("Hello, you have reached contacts-api. Please navigate to /contacts, /categories, or /companies to continue.");
    })
};

route("");

route("categories");

route("contacts");

route("companies");

app.listen(1234,()=>{
    console.log("Server is listening on localhost:1234")
});