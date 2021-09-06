//variables
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

//UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");


//clases

class Citas {
	constructor(){
		this.citas = []
	}

	agregarCita(cita){
		this.citas = [...this.citas, cita];
	}

	eliminarCita(id){
		this.citas = this.citas.filter( cita => cita.id !== id )
	}
}


class UI {
	imprimirAlerta(mensaje, tipo){
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

		if(tipo === 'error'){
			divMensaje.classList.add('alert-danger')			
		}else{
			divMensaje.classList.add('alert-success')
		}

		divMensaje.textContent = mensaje

		//agregar mensaje al dom
		document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"))

		setTimeout( () => {
			divMensaje.remove()
		}, 5000)
	}

	imprimirCitas( {citas} ){

		this.limpiarHTML()

		citas.forEach( cita => {
			const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
			
			const divCita = document.createElement('div')
			divCita.classList.add('cita', 'p-3');
			divCita.dataset.id = id;

			//Scriptinf de los elementos de las citas
			const mascotaParrafo = document.createElement('h2');
			mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
			mascotaParrafo.textContent = mascota;

			const propietarioParrafo = document.createElement('p');
			propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`

			const telefonoParrafo = document.createElement('p');
			telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`

			const fechaParrafo = document.createElement('p');
			fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`

			const horaParrafo = document.createElement('p');
			horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`

			const sintomasParrafo = document.createElement('p');
			sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`

			//boton para eliminar cita
			const btnEliminar = document.createElement('button');
			btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
			btnEliminar.innerHTML = 'Eliminar'

			btnEliminar.onclick = () => eliminarCita(id)


			//agregar los parrafos a divCita
			divCita.appendChild(mascotaParrafo);
			divCita.appendChild(propietarioParrafo)
			divCita.appendChild(telefonoParrafo)
			divCita.appendChild(fechaParrafo)
			divCita.appendChild(horaParrafo)
			divCita.appendChild(sintomasParrafo)
			divCita.appendChild(btnEliminar)
			contenedorCitas.appendChild(divCita)

		})
	}

	limpiarHTML(){
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild)
		}
	}
}

const ui = new UI();
const administrarCitas = new Citas()


//eventos

eventListeners()
function eventListeners(){
	mascotaInput.addEventListener('input', datosCita);
	propietarioInput.addEventListener('input', datosCita);
	telefonoInput.addEventListener('input', datosCita);
	fechaInput.addEventListener('input', datosCita);
	horaInput.addEventListener('input', datosCita);
	sintomasInput.addEventListener('input', datosCita);

	formulario.addEventListener('submit', nuevaCita)

}



//  obejeto cita
let citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: ''
}

// clases 





//funciones

function datosCita(e){
	citaObj[e.target.name] = e.target.value
}


//Validar y agregar citas a la clase de citas
function nuevaCita(e){
	e.preventDefault()

	//Extraer la informacion de citaObjt
	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

	//validar
	if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
		ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

		return
	}

	//generar id
	citaObj.id = Date.now()

	administrarCitas.agregarCita({...citaObj});

	formulario.reset()

	ui.imprimirCitas( administrarCitas )

	reiniciarObjeto()
}


//reiciar el formulario para poder validar los campos
function reiniciarObjeto(){
	citaObj.mascota = '',
	citaObj.propietario = '',
	citaObj.telefono = '',
	citaObj.fecha = '',
	citaObj.hora = '',
	citaObj.sintomas = ''
}

function eliminarCita( id ){
	administrarCitas.eliminarCita(id)

	ui.imprimirAlerta("La cita a sido eliminada exitosamente")

	ui.imprimirCitas( administrarCitas )
}









