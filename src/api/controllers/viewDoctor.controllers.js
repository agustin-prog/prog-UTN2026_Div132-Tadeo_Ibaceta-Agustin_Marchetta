/*===================================
    Controladores de vista doctores
=====================================*/
import DoctorModels from "../models/doctor.models.js";
import { join, __dirname } from "../utils/index.js";

////////////////////
// Vista principal
export const doctorView = async (req, res) => {
    try {

        const [rows] = await DoctorModels.selectAllDoctors();
        
        res.render("indexDoctor", { // aca va el ejs a q se mostraria
            title: "Dashboard doctores",
            about: "Doctores",
            doctorsArray: rows
        });

    } catch (error) {
        console.log("Error obteniendo informacion", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });

    }
}



////////////////////
// Vista obtener doctor
export const getDoctorView = (req, res) => {
    res.render("indexDoctor", {
        title: "Consultar doctores",
        about: "Consultar doctor por id: "
    });
}



////////////////////
// Vista crear doctor
export const createDoctorView = (req, res) => {
    res.render("post", {
        title: "Crear doctores",
        about: "Crear doctor"
    });
}



////////////////////
// Vista actualizar doctor
export const updateDoctorView = (req, res) => {
    res.render("put", {
        title: "Modificar doctores",
        about: "Consultar doctor por id: "
    });
}



////////////////////
// Vista eliminar producto
export const deleteDoctorView = (req, res) => {
    res.render("delete", {
        title: "Eliminar doctores",
        about: "Consultar doctor por id: "
    });
}