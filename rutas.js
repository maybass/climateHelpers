const express = require('express')
const router = express.Router()

//los siguientes obviamente se requieren donde los controladores, porq ahi estan las funciones, al exportar ya carga con todo eso
//const nodemailer = require("nodemailer");
//const productos = require('../productos.json');// luego hacerlo con base de datos





const {editarProductoGET,
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
	inicioGET } = require('../controllers/controller')



//post enviar un correo o para incluir info en una base de datos
//get aparece en la url para search busquedas tienda mia, ml etc


// ======= RUTAS FRONT ====================

router.get('/', inicioGET)

router.get('/log-in' , loginGET)

router.post('/log-in', loginPOST)

router.get('/detalles-producto/:id' , detallesProductoGET_ID)




router.get('/sobre-nosotros',sobreNosotrosGET)


router.get('/como-comprar',comoComprarGET)

router.get('/productos', productosGET);
	
	


router.get('/contacto',contactoGET)

router.post('/contacto' , contactoPOST)

/*app.get('/terms' , (req,res)=> {
	res.render('terms' , {
		titulo: 'Terminos y Condiciones'
	}); //deberia ser un estatico, ya esta en public 
	
	
	
})*/



// =============== RUTAS BACK =====================
//ADMIN y crud AGREGAR Y EDITAR Y LOGin

router.get('/admin', adminGET)

router.get('/agregar-producto', agregarProductoGET)

router.post('/agregar-producto' , agregarProductoPOST)

router.get('/editar-producto/:id', editarProductoGET)

router.post('/editar-producto/:id', editarProductoPOST)

router.get('/borrar-producto/:id',  borrarProductoGET)

router.get('/logout', logout)






module.exports = router