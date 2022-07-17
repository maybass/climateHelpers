const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto'
})

connection.connect((err)=> {
	if(err) throw err
	console.log('Base de datos esta conectada')
})

/*connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
}) */

//connection.end()

module.exports = connection 