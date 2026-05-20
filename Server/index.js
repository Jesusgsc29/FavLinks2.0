require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 9002
const db = require('./queries')

const cors = require('cors')
app.use(cors())   // for class projects; tighten origin in production

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//host react app as a static file
app.use(express.static(path.resolve(__dirname,'../Client/dist')))



//Routes
app.get('/',(req,res) =>{
    //will do something here 
    res.sendFile(path.resolve(__dirname,'../Client/dist/index.html'))
})

app.get('/test',(req,res) =>{

})

//CREATE
app.post('/new',db.createLink)

//READ
app.get('/links', db.getLinks)

//UPDATE
app.put('/links/:id', db.updateLink)

//DELETE
app.delete('/links/:id', db.deleteLink)


//Starting Express on PORT
app.listen(PORT, () =>{
    console.log(`The app is running in port ${PORT}.`)
})