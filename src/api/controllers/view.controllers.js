/*================================
    Controladores de vistas
================================*/

import DoctorModels from "../models/doctor.models.js";
import { join, __dirname } from "../utils/index.js";

////////////////////
// Vista principal
export const doctorView = async (req, res) => {
    try {

        const [rows] = await DoctorModels.selectAllDoctors();

        res.render("indexDoctor", {
            title: "Dashboard",
            about: "Nuestros doctores",
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
    res.render("getDoctor", {
        title: "Consultar",
        about: "Consultar doctor por id: ",
    });
}



////////////////////
// Vista crear doctor
export const createDoctorView = (req, res) => {
    res.render("postDoctor", {
        title: "Crear",
        about: "Crear doctor"
    });
}



////////////////////
// Vista actualizar doctor
export const updateDoctorView = (req, res) => {
    res.render("putDoctor", {
        title: "Modificar",
        about: "Consultar doctor por id: "
    });
}



////////////////////
// Vista eliminar producto
export const deleteDoctorView = (req, res) => {
    res.render("deleteDoctor", {
        title: "Eliminar",
        about: "Consultar doctor por id: "
    });
}