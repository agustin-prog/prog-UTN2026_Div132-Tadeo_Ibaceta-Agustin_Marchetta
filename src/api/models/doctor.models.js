/*================================
    Modelos de Doctoro
================================*/

import connection from "../database/db.js";


// Traer todos los doctores
const selectAllDoctors = () => {
    // Se crea una variable con la consulta sql para hacerla mas legible visualmente
    const sql = "SELECT id_doctor, nombre, apellido, matricula, image, id_especialidad, disponible FROM doctores";
    return connection.query(sql);
}


// Traer doctor por id
const selectDoctorById = (id) => {
    const sql = "SELECT id_doctor,nombre, apellido, matricula, image, id_especialidad, disponible FROM doctores where doctores.id_doctor = ?";
    return connection.query(sql, [id]);
}

// Traer doctor por matricula
const selectDoctorByMatricula = (matricula) =>{
    const sql = "SELECT id_doctor,nombre, apellido, matricula, image, id_especialidad, disponible FROM doctores where doctores.matricula = ?";
    return connection.query(sql, [matricula]);
}


// Crear Doctor
const insertNewDoctor = (nombre, apellido, matricula, image, especialidad, disponible) => {
    const sql = "INSERT INTO doctores (nombre, apellido, matricula, image, id_especialidad, disponible) VALUES (?, ?, ?, ?, ?, ?)";
    
    // Se devulve la respuesta en un rows para devolver info util como el id asignado al nuevo doctor
    return connection.query(sql, [nombre, apellido, matricula, image, especialidad, disponible]);
}


// Modificar Doctor
const updateDoctor = (nombre, apellido, matricula, image, especialidad, disponible, id) => {
    const sql = "UPDATE doctores SET nombre = ?, apellido = ?, matricula = ?, image = ?, id_especialidad = ?, disponible = ? WHERE id_doctor = ?";
    
    // Guardamos el resultado de la conexion que nos bridara info para la optimziacion
    return connection.query(sql, [nombre, apellido, matricula, image, especialidad, disponible, id]);
}


// Eliminar Doctor
const deleteDoctor = (id) => {
    const sql = "DELETE FROM doctores WHERE id_doctor = ?";

    return connection.query(sql, [id]);
}


export default {
    selectAllDoctors,
    selectDoctorById,
    selectDoctorByMatricula,
    insertNewDoctor,
    updateDoctor,
    deleteDoctor
}