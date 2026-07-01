// ──────────────────────────────────────────────────────────
// FUNCIONES PARA EL CONTROL FRONTEND DE ADMIN PARA DOCTORES
// ──────────────────────────────────────────────────────────


/* 
    Se encarga de ser llamado cada vez que el boton guardar se le haga click,
    va a crear (POST) o actualizar (PUT) un doctor ingresado del form.
*/
document.getElementById("btn-guardar").addEventListener("click", async () => {

    const doctor = {
        nombre: document.getElementById("input-nombre").value.trim(),
        apellido: document.getElementById("input-apellido").value.trim(),
        image: document.getElementById("input-imagen").value.trim() || null,
        matricula: Number(document.getElementById("input-matricula").value.trim()),
        especialidad: document.getElementById("especialidades").value,
        disponible: document.getElementById("input-disponible").checked,
    };

    let errores = validarDoctor(doctor);

    if(errores.length > 0){
        let errorStr = errores.join("\n ")
        mostrarMensaje("error", errorStr);
        return;
    }

    try{

        // Decidimos dinámicamente la URL y el método HTTP según el "modo" actual del form.
        // Si idEditando tiene un valor (número), estamos en modo edición → PUT al endpoint con ese id.
        // Si idEditando es null, estamos en modo creación → POST al endpoint base sin id.
        // Operador Ternario
        const url = idEditando 
            ? `http://localhost:3001/api/doctors/${idEditando}` 
            : `http://localhost:3001/api/doctors/`;

        const method = idEditando ? "PUT" : "POST";

        // Ejecutamos la petición HTTP con los datos del doctor serializados como JSON.
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" }, // headers le indica al servidor que el body es JSON (necesario para que express.json() lo parsee).
            body: JSON.stringify(doctor) // JSON.stringify convierte el objeto JS "doctor" a un string JSON para poder enviarlo por HTTP.
        });

        // Parseamos la respuesta del servidor de JSON a objeto JS.
        // Esto nos permite leer response.message, response.errores, etc.
        const result = await response.json();

        if(!response.ok){
            mostrarMensaje("error", result.errores);
            return;
        }

        resetForm();

        idEditando = null;

        const infoObject = `${result.message}`
        mostrarMensaje("exito", infoObject)
        console.log(infoObject);

        refrescarListaDoctores();

    }catch(error){
        console.error("Error al enviar los datos: ", error);
    }
});


/* 
    Se encarga de ser llamado cada vez que se haga click en el boton cancelar
    para resetera el formulario y los mensajes
*/
document.getElementById("btn-cancelar").addEventListener("click", () => {
    
    mostrarMensaje("","");
    resetForm();
});


/* 
    Se encargara de manejar y escuchar las acciones de los
    botones de cada card de doctor ( Modificar y Eliminar )
*/
let idEditando = null;
document.getElementById("lista-doctores").addEventListener("click", async (e) => {


    if(e.target.classList.contains("btn-eliminar")){
        
        const id_btn = e.target.dataset.id;
        const elementoAEliminar = e.target.closest('.card-doctor');
        
        if(!funcionPreguntar(`Desea eliminar el doctor con el id: ${id_btn}`)){
            return
        }

        funcionScroll();
        
        try {

            const response = await fetch(`http://localhost:3001/api/doctors/${id_btn}`, {
            method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                mostrarMensaje("error", result.errores);
                return;
            }

            elementoAEliminar.remove();

            const infoObject = `${result.message}`
            mostrarMensaje("exito", infoObject)
            console.log(infoObject);

        } catch(error){
            console.error("Error al enviar los datos: ", error);
        }
    }
    

    if(e.target.classList.contains("btn-modificar")){

        funcionScroll();

        const id_btn = e.target.dataset.id;

        try{
            const response = await fetch(`http://localhost:3001/api/doctors/${id_btn}`, {
                method: "GET"
            });

            const result = await response.json();
            if (!response.ok) {
                mostrarMensaje("error", result.errores);
                return;
            }

            const doctor = result.payload[0];

            cargarDatosEnForm(doctor);

            idEditando = doctor.id_doctor;
        }catch(error){
            console.error("Error al cargar el doctor:", error);
        }
    }
});


/* 
    Se encarga escuchar y manejar el buscador de doctores por id,
    segun el id devuelve el card de doctor de ese id o si es vacio
    devuelve todas las card de doctores
*/
document.getElementById("getObject-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const divListaDoctores = document.getElementById("lista-doctores");
    const idBuscado = document.getElementById("idProd").value.trim();
    
    if(idBuscado !== ""){
        
        try{
    
            const response = await fetch(`http://localhost:3001/api/doctors/${idBuscado}`, {
                method: "GET"
            });
    
            const result = await response.json();
    
            // Optimizacion 4: Manejamos respuesta no ok del servidor
            if (!response.ok) {
                mostrarMensaje("error", result.message);
                return;
            }   
    
            const doctor = result.payload[0];
    
            const divDoctor = crearCardHTML(doctor);
    
            divListaDoctores.innerHTML = divDoctor;
    
        }catch(error){
            console.error("Error al enviar los datos: ", error);

        }
    } else {
        
        try{
            
            refrescarListaDoctores();

        }catch(error){
            console.error("Error al enviar los datos: ", error);
        }
    }

});


// ─────────────────────────────────────────────
//       VALIDACIONES Y FUNC. ADICIONALES
// ─────────────────────────────────────────────

// Validamos previamente los datos en el cliente
function validarDoctor(data) {
    const errores = [];

    if (!data.nombre || data.nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.apellido || data.apellido.trim().length < 3) {
        errores.push("El apellido debe tener al menos 3 caracteres");
    }

    if (!data.image) {
        errores.push("El doctor debe tener una imagen");
    }

    if (!data.matricula ||  data.matricula < 1000 || data.matricula > 9999) {
        errores.push("La matricula debe de ser de 4 numeros");
    }

    return errores;
}

// Mensaje de exito o error 
function mostrarMensaje(tipo, mensaje) {
    const errorMsg = document.getElementById("form-error");
    const exitoMsg = document.getElementById("form-exito");

    errorMsg.classList.add("invisible");
    exitoMsg.classList.add("invisible");

    errorMsg.classList.remove("visible");
    exitoMsg.classList.remove("visible");

    if(tipo === "error"){
        errorMsg.textContent = mensaje;
        errorMsg.classList.replace("invisible", "visible");
    } else if(tipo === "exito") {
        exitoMsg.textContent = mensaje;
        exitoMsg.classList.replace("invisible", "visible");
    } else {
        errorMsg.classList.remove("visible");
        exitoMsg.classList.remove("visible");
    }
}

/* Crea el HTML de cada doctor */
function crearCardHTML(doctor){
    item = `
        <div class="card-doctor">
            <div class="card-info">
                <h3>Nombre: ${doctor.nombre} ${doctor.apellido}</h3>
                <p>Id_doctor: ${doctor.id_doctor}</p>
                <p>Matricula: ${doctor.matricula}</p>
            </div>
            <div class="card-btn">
                <a class="btn-doc" href="./adminHorarios">Ver horarios</a>
                <button class="btn-doc btn-modificar" data-id="${doctor.id_doctor}">Modificar</button>
                <button class="btn-doc btn-eliminar" data-id="${doctor.id_doctor}">Eliminar</button>
            </div>
        </div>
    `;
    return item;
}

/* Carga los datos del doctor asignado en el form */
function cargarDatosEnForm(doctor){
    console.log(doctor);
    document.getElementById("input-nombre").value = doctor.nombre;  
    document.getElementById("input-apellido").value = doctor.apellido;
    document.getElementById("input-imagen").value = doctor.image;
    document.getElementById("input-matricula").value = doctor.matricula;
    document.getElementById("especialidades").value = doctor.id_especialidad;
    document.getElementById("input-disponible").checked = doctor.disponible;
}


/* 
    Funcion que llama al endpoint api/doctors/ para traer
    a todos los doctores y los inyecta en el HTML
*/
async function refrescarListaDoctores(){
    const divListaDoctores = document.getElementById("lista-doctores");

    const responseAll = await fetch(`http://localhost:3001/api/doctors/`, {
            method: "GET"
        });

    const resultAll = await responseAll.json();
    
    // Optimizacion 4: Manejamos respuesta no ok del servidor
    if (!responseAll.ok) {
        mostrarMensaje("error", resultAll.message);
        return;
    }   
    
    const doctoresArray = resultAll.payload;
    let htmlContenido = "";

    doctoresArray.forEach(doctor => {

        htmlContenido += crearCardHTML(doctor);
    });

    divListaDoctores.innerHTML = htmlContenido;
}


/* 
    Funcion que resetea el formulario a valores vacios
*/
function resetForm(){
    document.getElementById("input-nombre").value = ""
    document.getElementById("input-apellido").value = ""
    document.getElementById("input-imagen").value = ""
    document.getElementById("input-matricula").value = ""
    document.getElementById("especialidades").value = 1;
    document.getElementById("input-disponible").checked = true;
}

function funcionScroll(){
    window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function funcionPreguntar(mensaje){
    return window.confirm(mensaje);
}