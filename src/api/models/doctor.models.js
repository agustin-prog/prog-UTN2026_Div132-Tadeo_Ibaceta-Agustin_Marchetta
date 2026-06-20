/*================================
    Modelos de Doctoro
================================*/

import connection from "../database/db.js";


// Traer todos los doctores
const selectAllDoctors = () => {
    // Se crea una variable con la consulta sql para hacerla mas legible visualmente
    const sql = "SELECT id, nombre, apellido, matricula, image, especialidad FROM doctors";
    return connection.query(sql);
}


// Traer doctor por id
const selectDoctorById = (id) => {
    const sql = "SELECT id,nombre, apellido, matricula, image, especialidad FROM doctors where doctors.id = ?";
    return connection.query(sql, [id]);
}

// Traer doctor por matricula
const selectDoctorByMatricula = (matricula) =>{
    const sql = "SELECT id,nombre, apellido, matricula, image, especialidad FROM doctors where doctors.matricula = ?";
    return connection.query(sql, [matricula]);
}


// Crear Doctor
const insertNewDoctor = (nombre, apellido, matricula, image, especialidad) => {
    const sql = "INSERT INTO doctors (nombre, apellido, matricula, image, especialidad) VALUES (?, ?, ?, ?, ?)";
    
    // Se devulve la respuesta en un rows para devolver info util como el id asignado al nuevo doctor
    return connection.query(sql, [nombre, apellido, matricula, image, especialidad]);
}


// Modificar Doctor
const updateDoctor = (nombre, apellido, matricula, image, especialidad, id) => {
    const sql = "UPDATE doctors SET nombre = ?, apellido = ?, matricula = ?, image = ?, especialidad = ? WHERE id = ?";
    
    // Guardamos el resultado de la conexion que nos bridara info para la optimziacion
    return connection.query(sql, [nombre, apellido, matricula, image, especialidad, id]);
}


// Eliminar Doctor
const deleteDoctor = (id) => {
    const sql = "DELETE FROM doctors WHERE id = ?";

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