const express=require('express')
const app=express()
//create database with server
const databaseconnect=require("./database")
databaseconnect()
//parse the data
app.use(express.json())
app.use('/Persons', require('./Routes/PersonRoutes'))
const port=5000

app.listen( port, (err)=> {
    err ? console.log(err) : console.log('the server is running on port 5000')
})