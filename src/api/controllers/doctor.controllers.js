/*================================
    Controladores de producto
================================*/

import DoctorModels from "../models/doctor.models.js";
import especialidadModels from "../models/especialidad.models.js";

// Get all doctors
export const getAllDoctors = async (req, res) => {

    // Manejo de errores con try...catch
    try {

        const [rows] = await DoctorModels.selectAllDoctors();

        // En caso de no haber doctores, devolvemos un 404
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron doctores"
            });
        }
    
        res.status(200).json({
            payload: rows,
            total: rows.length // Tambien enviamos el total de doctores
        });

    } catch (error) {
        console.log("Error obteniendo los productos: ", error);

        // Devolvemos un codigo de estado 500 por errores del servidor
        res.status(500).json({
            message: "Error interno al obtener doctores"
        });
    }
}


// Get doctor by id
export const getDoctorById = async (req, res) => {

    // Manejamos errores con try...catch
    try {
        const [rows] = await DoctorModels.selectDoctorById(req.id);
    
        // Devolveremos un codigo de estado 404 (Not Found) si no existe ningun doctor con ese id
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró ningun doctor con id ${req.id}`
            });
        }
    
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);

        // Devolvemos un error 500
        res.status(500).json({
            message: `Error interno al obtener un doctor con id ${req.id}`
        });
    }
}

//GET doctor by especialidad
export const getDoctorBySpeciality = async (req, res) => {
    try{
        const[rows] = await DoctorModels.selectDoctorByEspecialidad(req.especialidad);
        
        // Devolveremos un codigo de estado 404 (Not Found) si no existe ningun doctor de esa especialidad
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró ningun doctor especializado en ${req.especialidad}`
            });
        }
    
        res.status(200).json({
            payload: rows
        });

    } catch(error){
        // Devolvemos un error 500
        res.status(500).json({
            message: `Error interno al obtener un doctor especializado en ${req.especialidad}`
        });
    }
}


// Create new doctor
export const createDoctor = async (req, res) => {

    // Manejamos los errores en un bloque try...catch
    try {
        // Recogemos los datos limpios del body
        const {nombre, apellido, matricula, image, especialidad} = req.body;

        const [rowsMatricula] = await DoctorModels.selectDoctorByMatricula(matricula);
        if(rowsMatricula.length > 0){ 
            //422 Unprocessable Entity: trata la matricula repetida como un error de validación en el cuerpo de la solicitud.
            
            return res.status(422).json({
                message: "Matricula invalida, ya fue asignada anteriormente"
            });
        }

        const [rowsEspecialidades] = await especialidadModels.selectAllEspecialidades();
        const especialidadEncontrada = rowsEspecialidades.find(esp => esp.id_especialidad === Number(especialidad));

        if(!especialidadEncontrada){
            return res.status(422).json({
            message: "Especialidad invalida, esa especialidad no existe"
            });
        }

        const [rowsInsert] = await DoctorModels.insertNewDoctor(nombre, apellido, matricula, image, especialidad);
        
        // En lugar de 200, devolvemos un 201 "Created"
        res.status(201).json({
            message: "Doctor creado con exito",
            productId: rowsInsert.insertId
        });


    } catch (error) {
        console.log(error);

        // Devolvemos un codigo de estado 500
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}


// Modify doctor
export const modifyDoctor = async (req, res) => {
    // Manejo de errores con try...catch
    try {
        const {nombre, apellido, matricula, image, especialidad, disponible} = req.body;

        // Validamos que vengan los campos necesarios antes de tocar la BBDD
        if (!nombre || !apellido || !especialidad || !matricula) {
            return res.status(400).json({
                message: "Todos los campos del formulario son requeridos"
            });
        }
    
        const [rowsMatricula] = await DoctorModels.selectDoctorByMatricula(matricula);
        if(rowsMatricula.length > 0 && rowsMatricula[0].id_doctor !== req.id){
            return res.status(422).json({
                message: "Matricula invalida, ya fue asignada anteriormente"
            }); 
        }

        const [rowsEspecialidades] = await especialidadModels.selectAllEspecialidades();
        const especialidadEncontrada = rowsEspecialidades.find(esp => esp.id_especialidad === Number(especialidad));

        if(!especialidadEncontrada){
            return res.status(422).json({
            message: "Especialidad invalida, esa especialidad no existe"
            });
        }

        const [result] = await DoctorModels.updateDoctor(nombre, apellido, matricula, image, especialidad, disponible, req.id);
        
        // Verificamos si realmente se actualizo algo, guardando la respuesta de la BBDD
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizó ningún campo"
            })
        }
    
        return res.status(200).json({
            message: "Doctor actualizado correctamente"
        });


    } catch (error) {
        console.log(error);

        // Devolvemos un codigo de estado 500
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}


// Delete doctor
export const removeDoctor = async (req, res) => {
    // Manejamos los errores en un bloque try catch
    try {

        // Enviamos un error 404 si el doctor con ese id no existe
        const [rows]= await DoctorModels.selectDoctorById(req.id);
        if(rows.length === 0){
            return res.status(404).json({
                message: `Doctor con id ${req.id} no encontrado`
            });
        }
        
        await DoctorModels.deleteDoctor(req.id);
        
        res.status(200).json({
            message: `Doctor con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE`, error);
        
        // Enviamos una respuesta 500 al cliente
        res.status(500).json({
            message : "Error interno del servidor"
        });
    }
}