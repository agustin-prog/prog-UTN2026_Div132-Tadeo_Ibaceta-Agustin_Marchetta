// Import del modulo dotenv
import dotenv from "dotenv";

dotenv.config(); // Permite ocultar info secreto como contraseñaas o claves api,
//  para despues usarlas como variables en el entorno

export default {
    port: process.env.PORT || 3001, //puerto a utilizar
    database: { //info oculta de la base de datos
        host: process.env.DB_HOST, 
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}