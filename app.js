const express = require('express');
const session = require('express-session')
const hbs = require('hbs');
const path = require('path');
const nodemailer = require("nodemailer");
//const productos = require('./productos.json');// luego hacerlo con base de datos
const app = express();

//require('./db')


// SESIONES MIDDLEWARE
//CONSULTA A BASE DE DATOS PARA Q FUNCIONE EL LOGIN


// opciones hacen referencia a la base de datos, los mismos datos de db, asi queda como variable global y sirve en todos lados
//lo copio y lo pongo en app para q sea global y sirva para todos los archivos
//sino solo funcionaba en el archivo db.js, al copiarlo aca, es global y sirve para todos, esto es una variable global en movimiento y en accion REAL
let opciones = {
	 host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto'
}

app.use(session({
	//en secret deberia haber un process.env
	secret:,//pongo lo q quiera, esto va a hacer un calculo para sacar el id 
	resave : false,
	saveUninitialized : false,
	cookie : { maxAge : 300000 } // 5 minutos expire de sesion (ms) , tb se puede hacer c metodo touch
	
	
	
}))















app.set('view engine', 'hbs');
//para q m tome archivos q esten dentro de views pero dentro de otras carpetas BACK Y FRONT
//PARA PODER SEGUIR MANEJANDOLOS COMO 'INDEX', 'PRODUCTOS' sin la necesidad de establecer ruta especifica y detallada, lo busca solo 
//requiero path para poder hacerlo, codigo abajo
app.set('views', [
	path.join('./views/front'),
	path.join('./views/back'),
	path.join('./views')//NECESARIO MUY NECESARIO PARA Q ENCUENTRE EL 404 Q ESTA FUERA DE BACK Y FRONT
]) 


//archivos estaticos en carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')))

//codigo necesario para leer req.body 
// req.params para url, ver mas tarde
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));



app.use(express.static('public'))

//registrar parciales {{ > }}  para poder usar los parciales
hbs.registerPartials(__dirname + '/views/partials')

const routes = require('./routes/rutas')
app.use(routes)



// 404 es un middleware que VA DESPUES DE TODAS LAS RUTAS , VA AL FINAL PORQ PRIMERO LEE TODAS Y EN CASO D NO ENCONTRARLAS TIRA EL 404
// SI VE Q NO EXISTE NINGUNA RUTA AL LEER EL CODIGO, AHI SI EJECUTA EL 404 NOT FOUND
// SI VE Q NO EXISTE NINGUNA RUTA AL LEER EL CODIGO, AHI SI EJECUTA EL 404 NOT FOUND, es un middleware

app.use((req,res, next)=> { // con o sin next
	res.status(404).render('404' , {
		titulo: '404 -Not Found'
	});
})

// servidor escuchando en puerto 3000

app.listen(3000, () => {
	console.log('Servidor en puerto 3000');
	
})

