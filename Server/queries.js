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
const createLink = (request, response) =>{
    // Take data the user pass to us and insert into links table(database)
    const name = request.body.name 
    const URL = request.body.URL

    pool.query('INSERT INTO links (name, URL) VALUES ($1, $2)', [name,URL], (error,result) =>{
        if(error){
            throw error
        }
        response.status(201).send(`Link added with ID: ${result.insertId}`)
    })

}

//Read all data from database
const getLinks = (req,res) => {
    //get back all data currently in database
    pool.query('SELECT * FROM links ORDER BY id ASC',
    (error,result) =>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

//Update link in the db
const updateLink = (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { name, url } = request.body

    pool.query(
      'UPDATE links SET name = $1, url = $2 WHERE id = $3 RETURNING *',
      [name, url, id],
      (error, result) => {
        if (error) {
          throw error
        }
        if (result.rowCount === 0) {
          return response.status(404).json({ error: 'Link not found' })
        }

        response.status(200).json(result.rows[0])
      }
    )
  }

//Delete link in the db
const deleteLink = (request, response) => {
    const id = parseInt(request.params.id, 10)
    pool.query('DELETE FROM links WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      if (result.rowCount === 0) {
        return response.status(404).json({ error: 'Link not found' })
      }
      response.status(200).json({ message: 'Deleted', id })
    })
  }




module.exports = {
    getLinks,
    createLink,
    deleteLink,
    updateLink,
}