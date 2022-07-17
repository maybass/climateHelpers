
const axios= require('axios')
const hbs = require('hbs')
const express = require('express')
const app = express()



/*App name
bass's App
App ID
36f156f4
Key
86d1a949500e44db48b1eafe3bbf1afd*/




let temperatura;
let sensacionTermica;

axios.get('http://api.weatherunlocked.com/api/current/40.71,-74.00?app_id=36f156f4&app_key=86d1a949500e44db48b1eafe3bbf1afd')
.then((res)=> {
	
	temperatura = res.data.temp_c;
	sensacionTermica = res.data.feelslike_c;
	console.log(res.data.feelslike_c)
	console.log(temperatura)
})

.catch((err)=> {
	
	console.log("Error Axios Climate" , err)
})




hbs.registerHelper('temperaturaActual' , (temp) => {
	console.log("LA TEMPERATURA ES DE : " + temperatura)
	return temperatura;
	
})

hbs.registerHelper('saberTemp' , (saber) => {
	console.log("QUIERO SABER LA TEMPERATURA AHORA: " + temperatura)
	return temperatura;
})

hbs.registerHelper('decidir' , (siOno) => {
	temperatura = 7
	html = '<h1>'
	htmlCierre = '</h1>'
	iconoSol = '<i class="bi bi-brightness-high-fill"></i>'
	iconoLluvia = '<i class="bi bi-cloud-rain-fill"></i>'
	iconoNieve = '<i class="bi bi-cloud-snow-fill"></i>'
	iconoNublado ='<i class="bi bi-cloud-sun-fill"></i>'
	if(temperatura >=15 ) { // de 15 en adelante 
		return `${html} ${iconoSol} ${htmlCierre}`
		
	}else if (temperatura<=14 && temperatura>=6 ){ // entre 15 hasta 5
	
		return `${html} ${iconoLluvia} ${htmlCierre}`
	} else if (temperatura <= 5) { //menor o igual a 5 
		
		return `${html} ${iconoNieve} ${htmlCierre}`
	} else if (temperatura >=40) {
		return `${html} ${iconoNublado} ${htmlCierre}`
		
	} 
	
	
})


hbs.registerHelper('sensacionTermicaActual' , (sensacion) => {

	
	return sensacionTermica;
	
	
})


