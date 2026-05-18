require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 9002
const db = require('./queries')

//Routes
app.get('/',(req,res) =>{
    //will do something here 
    res.send("Hello from server")
})

app.get('/test',(req,res) =>{

})

//CREATE

//READ
app.get('/links', db.getLinks)

//UPDATE

//DELETE

//Starting Express on PORT
app.listen(PORT, () =>{
    console.log(`The app is running in port ${PORT}.`)
})