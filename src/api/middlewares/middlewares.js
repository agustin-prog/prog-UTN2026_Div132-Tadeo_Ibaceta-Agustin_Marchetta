/*========================
    Middlewares
========================*/

// Middleware logger (de aplicacion) analiza todas las solicitudes por consola (historial)
const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next();
};

// Middleware de ruta
const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Transformo el id a un numero

    // Si no es un entero o es 0 o inferior, devuelvo una respuesta 400 (Bad Request)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El id debe ser un numero entero positivo"
        });
    }

    // Incorporo el id a la req
    req.id = id;

    next(); // Damos paso al siguiente middleware o a procesar la respuesta
}



// Middleware de ruta para validar los campos de un formulario POST
const EspecialidadesValidas = ["pediatria", "traumatologia", "dermatologia"];
const validateDoctor = (req, res, next) => {

    // Recogemos los datos del body
    const { nombre, apellido, matricula,  especialidad} = req.body;

    // Array vacio de errores
    const errores = [];

    // Validamos si se recibieron todos del body
    if (!nombre || !apellido || !especialidad || !matricula) { // Valida que esten todos los campos completos
        errores.push("Datos invalidos, asegurate de incluir todas las categorias");
    }

    if (typeof nombre !== "string" || nombre.trim().length < 2) {   // Valida tipo y cantidad de caracteres del nombre
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof apellido !== "string" || apellido.trim().length < 2){ // Valida tipo y cantidad de caracteres del apelido
        errores.push("El apellido debe tener al menos 2 caracteres");
    }

    if (typeof matricula !== "number" || matricula >= 1000 && matricula <= 9999) { // Valida tipo y rango del numero de matricula
        errores.push("El numero de matricula no es válido");
    }

    if(!EspecialidadesValidas.includes(especialidad)) { // Valida la especialidad
        errores.push("Especialidad invalida");
    };

    // Detectamos si existe algun error en la lista y lo devolvemos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos", errores
        });
    }

    next();
}


export {
    loggerURL,
    validateId,
    validateDoctor
}