//Connect to Posgres

const POOL = require('pg').Pool

const pool = new POOL({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

//Create all funtions for request handler

//Create a new link in the db

//Read all data from database
const getLinks = (req,res) => {
    pool.query('SELECT * FROM links ORDER BY id ASC',
    (error,result) =>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

//Update link in the db


//Delete link in the db





module.exports = {
    getLinks,
}