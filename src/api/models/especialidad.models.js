/*================================
    Modelos de Doctoro
================================*/

import connection from "../database/db.js";


// Traer todas las especialidades
const selectAllEspecialidades = () => {
    // Se crea una variable con la consulta sql para hacerla mas legible visualmente
    const sql = "SELECT id_especialidad, nombre FROM especialidades";
    return connection.query(sql);
}

export default {
    selectAllEspecialidades
}