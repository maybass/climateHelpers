//const productos = require('../productos.json');
const nodemailer = require("nodemailer");
const db = require('../db')


// para axios
require('../helpers/helper');
//const axios= require('axios')
//const hbs = require('hbs')
require('../helpers/helperClima')


//NAME en el formulario debe coincidir con las columnas de la base de datos 



//CONTROLLERS FRONT 

const inicioGET = (req,res)=> {
	res.render('index' , {
		titulo: 'Inicio',
		logueado : req.session.logueado,
			usuario : req.session.usuario
	});
	
}





const detallesProductoGET_ID = (req,res)=> {
	
	console.log("ID--> ", req.params.id) // si puso id 1 , la consulta es where id= 1 en la consulta de la base de datos
	// m muestra en la consola lo q pone en la url, params son los parametros d la url , los params despues de la barrita
	//req body formulario a todos los campos de un formulario, req params para la url
	console.log("ID --> " , req.params)
	let id = req.params.id // almaceno el objeto en una variable y la propiedad id porq m interesa tomar esa propiedad del objeto
	let sql ="SELECT * FROM productos WHERE id = ? " // porq va a ser depende del id q este tomando
	db.query(sql, id , (error, data) => {
		console.log(data)
		if(error) res.send(`Ocurrio un error ${error.code}`) // si hay un error avisale al usuario, con res.send
		if(data=="") {
			res.status(404).render('404' , {
				mensaje: `Producto con ID ${id} no existente`
			})
		} else {
			res.render('detalles-producto' , {
				titulo : `Detalles producto ${id}`,
				logueado : req.session.logueado,
			usuario : req.session.usuario,
				productos : data[0]
				
			})
		}
		
	})

	
}


const sobreNosotrosGET = (req,res)=> {
	res.render('sobre-nosotros' , {
		titulo: 'Sobre Nosotros',
		logueado : req.session.logueado,
			usuario : req.session.usuario
	});
	
	
}



const comoComprarGET = (req,res)=> {
	res.render('como-comprar' , {
		titulo: 'Como Comprar',
		logueado : req.session.logueado,
			usuario : req.session.usuario
	});
	
	
}


const productosGET = (req,res)=> {
	//GUARDAR LA CONSULTA EN UNA VARIABLE
	let sql = "SELECT * FROM productos"
	db.query(sql,(error, data)=> {
		if(error) res.send(`Ocurrio un error ${error.code}`)
			console.log(data)
		res.render('productos', {
			titulo : 'Productos',
			logueado : req.session.logueado,
			usuario : req.session.usuario,
			productos: data
		})
	
	
		
	
		
	})
	
	
	}
	
	
const contactoGET = (req,res)=> {
	res.render('contacto' , {
		titulo: 'Contacto',
		logueado : req.session.logueado,
			usuario : req.session.usuario
	});
	
	
}


const contactoPOST = (req,res)=> {
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {	
	user: "f93fcea39a396d", //process.env.EMAIL_USER, 
    pass: "9824150b90b4db"//process.env.EMAIL_PASS
  }
});

//usar dotenv para referenciar variables para q no esten a la vista de todos , q esas variables solo se definan en nuestra pc 
//datos sensibles 
//git ignore junto con nodemodules. node modules lo vuelvo a instalar con npm i
// .env nunca se sube a github al igual q node_modules
	
	//2.definimos el cuerpo de mail CUERPO
	console.log("BODY: " , req.body)
	let data = req.body //info recibida del formulario
	let mailOptions = {
		from: data.email, 
		to: 'probando@prueba' ,//mail al q quiero q envie esta info, que pongo usando mailtrap.io? Funciona poniendo cualquier mail
		subject : data.asunto,
		text : data.comentarios
	}
	
	//3. enviamos el mail  MAIL
	transport.sendMail(mailOptions, (err, info) => {
		if(err) {
			console.log(err)
			res.status(500, err.message)
			res.status(500).render('/contacto' , {
				mensaje: `ha ocurrido el siguiente error ${err.message}`
				
			})
		}else {
			console.log('email enviado')
			res.status(200).render('contacto' , {
				mensaje : `tu email ha sido enviado correctamente`
			})
		}
		
	})
}


//controllers BACK


const adminGET = (req,res) => {
	
	
	if(req.session.logueado) { //existe este objeto con propiedad logueado ?? si. o no
		let sql = "SELECT * FROM productos"
	db.query(sql,(error,data) =>{
		if(error) res.send(`Ocurrio el siguiente error ${error.code}`);
		res.render('admin' , {
			titulo: 'Panel de Control',
			logueado : req.session.logueado,
			usuario : req.session.usuario,
			productos : data
			
		})
		
		
	})
		
		
	} else {
		
		res.render('log-in', {
			titulo : 'Log In', 
			error: 'Por favor loguearse para ver esta pagina'
			
		})
	}
	
	
	
}


const agregarProductoGET = (req,res) => { //falta hacerle la ruta post

if(req.session.logueado) {
	res.render('agregar-producto' , {
		titulo: 'Agregar producto',
		logueado : req.session.logueado,
			usuario : req.session.usuario
		
	})

	
	
} else {
	
	res.render('log-in', {
			titulo : 'Log In', 
			error: 'Por favor loguearse para ver esta pagina'
	
	
})

	
	
	
}

}

const agregarProductoPOST = (req, res) => {

	console.log("DATOS FORM --> " , req.body)
	const detallesProducto = req.body
	let sql = "INSERT INTO productos SET ? "  
	db.query(sql, detallesProducto, (error, data) => {
		
		if(error) res.send(`Ocurrio el siguiente error ${error.code}`)
			console.log('Producto agregado correctamente')
		
			
	})
		res.render('agregar-producto', {
		mensaje: 'Producto agregado correctamente',
		titulo: 'Agregar Producto'
	
		
	})
}








//EDITAR GET NECESITAMOS CONSULTAR A LA BASE DE DATOS PORQ NECESITAMOS PRE-LLENAR EL "FORMULARIO"
//EDITAR GET ID, SABE Q PRODUCTO TIENE Q PRELLENAR POR EL ID
const editarProductoGET = (req,res) => {
	
	if(req.session.logueado) {
		let id = req.params.id //toma el id del form
	let sql = 'SELECT * FROM productos WHERE id = ?'
	db.query(sql, id, (err, data)=> {
		if(err) res.send(`Ocurrio un error ${err.code}`)
			if (data=='') {
				res.status(404).render('404' , {
					titulo : '404-Not Found', 
					mensaje : `Producto con ID ${id} no existente`
				})
			} else {
				res.render('editar-producto' , {
				titulo : `Editando producto ${id}`,
				logueado : req.session.logueado,
			usuario : req.session.usuario,
				productos : data[0]
	})
			}
	
	})
} else {
	
	res.render('log-in', {
			titulo : 'Log In', 
			error: 'Por favor loguearse para ver esta pagina'
})
}
}

//EDITAR POST 


const editarProductoPOST = (req,res) => {
	let id = req.params.id // lo primero es tomar el id de la url
	let detallesProducto = req.body //tomar la info del cuerpo del form
	
	let sql = "UPDATE productos SET ? WHERE id = ? "
	db.query(sql, [detallesProducto, id] , (err,data) => {
		if(err) res.send (`Ocurrio el siguiente error ${err.code}`);
		console.log(data.affectedRows + " registro actualizado ")
		
		
	})
	
	res.redirect('/admin')
	//producto editado con exito como hacerlo con res .redirect?	
}

//borrar por id
//un get porq voy a ir a tal ruta

const borrarProductoGET = (req,res) => {
	
	if(req.session.logueado) {
		let id= req.params.id
	let sql = 'DELETE FROM productos WHERE id = ?'
	db.query(sql, id, (err, data) => {
		if(err) res.send(`Ocurrio un error ${err.code}`)
			console.log(data.affectedRows + " registro eliminado ")	
	})
	
	res.redirect('/admin')
	//producto eliminado con exito como hacerlo con res.redirect ?
	
	
} else {
	
	res.render('log-in', {
			titulo : 'Log In', 
			error: 'Por favor loguearse para ver esta pagina'
})
	
}

}


const loginGET = (req,res)=> { 
	res.render('log-in' , {
		titulo: 'Log In'
	});
}


const loginPOST = (req,res) => {
	let usuario = req.body.username
	let clave = req.body.password
	
	if(usuario && clave) {  // con falsy y truthy si usuario es "" string vacia es falsy por lo tanto no entra
	//si devuelve true es porq al menos tiene algun caracter 
	
	let sql = "SELECT * FROM cuentas WHERE email = ? AND clave = ?"
	db.query(sql, [usuario, clave] , (error, data) => {
		console.log("DATA", data)
		if(data.length>0) { //con data.length podria haber sido tb q si era 0 es falsy sino 1 truthy
			//ok vamos a usar la sesion para q lo almacene
			req.session.logueado = true // agregamos una propiedad al objeto
			req.session.usuario = usuario // para los encabezados login logout ARRIBA en la interfaz grafica
			
			res.redirect("/admin")
			
		} else {
			
			//error
			
			res.render('log-in' , {
				titulo: 'Log in',
				error: 'Nombre de usuario o contrasena incorrecto'
				
			})
		}
		
	})
		
	} else {
		res.render('log-in' , {
				titulo: 'Log in',
				error: 'Por favor escriba usuario y contrasena para ingresar'
				
			})
	}				
	
}

const logout = (req,res) => {
	req.session.destroy(function (err) {
		if(err) res.send(`se produjo este error ${err.code}`)
	})
	
	res.render('index', {
		titulo: 'Inicio'
		
	})
}

module.exports = {
	editarProductoGET,
	loginPOST,
	editarProductoPOST,
	agregarProductoGET,
	adminGET,
	contactoPOST,
	contactoGET,
	productosGET,
	comoComprarGET,
	sobreNosotrosGET,
	detallesProductoGET_ID,
	 borrarProductoGET ,
	agregarProductoPOST,
	loginGET,
	logout,
	inicioGET
}


