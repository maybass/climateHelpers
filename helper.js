const axios= require('axios')
const hbs = require('hbs')
const express = require('express')
const app = express()


app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

//calculo del dolar 

let dolar;
let dolarPAIS;


axios.get('https://dolarsi.com/api/api.php?type=valoresprincipales')
.then((res) => {
	
	dolar = res.data[0].casa.venta // "136,30" nos da un string
	
	dolar = dolar.replace(/,/g, ".")  //esto es un metodo de js q quiero poner, cada vez q encuentre una coma,  por un punto
	
	dolar = parseFloat(dolar) //porq el json de la api devuelve strings
	
	console.log('EL DOLAR ES DE : ' + dolar) // lo va a cambiar la , por el .
	
	
})

.then (()=> {
	
	const impuestoPais=0.30
	const percepcionAfip = 0.35
	dolarPAIS = (dolar *impuestoPais) + (dolar*percepcionAfip) + dolar
	console.log('EL DOLAR PAIS ES DE ' + dolarPAIS)
	return dolarPAIS
	
})


.catch((err)=> {
	
	console.log("Error Axios" , err)
})



hbs.registerHelper('dolarApeso', (precio) => {
	
	let precioFinalARS= dolarPAIS * precio
	console.log('EL PRECIO FINAL ARS ES DE : ' + precioFinalARS)
	return new Intl.NumberFormat("es-AR", {style: "currency" , currency :"ARS"}).format(precioFinalARS)
})


