import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import { 
	mascotaInput,
	propietarioInput,
	telefonoInput,
	fechaInput,
	horaInput,
	sintomasInput,
	formulario,
} from './selectores.js';


const ui = new UI();
const administrarCitas = new Citas()


let editando;

//  obejeto cita
let citaObj = {
	mascota: '',
	propietario: '',
	telefono: '',
	fecha: '',
	hora: '',
	sintomas: ''
}

export function datosCita(e){
	citaObj[e.target.name] = e.target.value
}

//Validar y agregar citas a la clase de citas
export function nuevaCita(e){
	e.preventDefault()

	//Extraer la informacion de citaObjt
	const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

	//validar
	if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
		ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

		return
	}

	if(editando === true){


		ui.imprimirAlerta("Editado correctamente")

		administrarCitas.editarCita({...citaObj})

		//regresar texto de boton a estado original
		formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

		editando = false

	}else{
		//generar id
		citaObj.id = Date.now()

		administrarCitas.agregarCita({...citaObj});
	
		//mensaje
		ui.imprimirAlerta("Se agrego correctamente")
	}

	formulario.reset()

	ui.imprimirCitas( administrarCitas )

	reiniciarObjeto()
}


//reiciar el formulario para poder validar los campos
export function reiniciarObjeto(){
	citaObj.mascota = '',
	citaObj.propietario = '',
	citaObj.telefono = '',
	citaObj.fecha = '',
	citaObj.hora = '',
	citaObj.sintomas = ''
}

export function eliminarCita( id ){
	administrarCitas.eliminarCita(id)

	ui.imprimirAlerta("La cita a sido eliminada exitosamente")

	ui.imprimirCitas( administrarCitas )
}


export function cargarEdicion( cita ){
	const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

	//llenar inputs
	mascotaInput.value = mascota
	propietarioInput.value = propietario
	telefonoInput.value = telefono
	fechaInput.value = fecha
	horaInput.value = hora
	sintomasInput.value = sintomas

	//llenar el obejto
	citaObj.mascota = mascota
	citaObj.propietario = propietario
	citaObj.telefono = telefono
	citaObj.fecha = fecha
	citaObj.hora = hora
	citaObj.id = id



	//cambiar el texto del boton
	formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

	editando = true;
}
