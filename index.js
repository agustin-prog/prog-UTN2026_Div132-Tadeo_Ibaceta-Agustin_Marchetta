/////////////////////
// Importaciones
import express from "express";
const app = express();
import environments from "./src/api/config/environment.js";
import { doctorRoutes, viewDoctor, viewRoutes } from "./src/api/routes/index.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { join, __dirname } from "./src/api/utils/index.js"; // Importamos la configuracion para trabajar con rutas de /utils


/////////////////////
// Config
const PORT = environments.port;



/////////////////////
// Middlewares
app.use(cors()); // Middleware basico para permitir todas las solicitudes

// Middleware para parsear JSON en las solcitudes POST y PUT
app.use(express.json()); // sin esto, recibe como undefined

app.use(loggerURL);

app.use(express.static(join(__dirname, "src/public"))); // Middleware para servir archivos estaticos
// Gracias a esta configuracion, ya puedo acceder a http://localhost:3000/css/styles.css -> y obtener el archivo css que se encuentra en la ruta "src/public/css/styles.css"

// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs"); // Motor de vistas
app.set("views", join(__dirname, "src/views")); // Desde la raiz del servidor apuntamos a / + /src + /views


/////////////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Hola Capoooo");
});

//////////
// Rutas
app.use("/api/doctors", doctorRoutes); // Rutas de doctores
//app.use("/dashboard", viewRoutes) // Rutas de vista
app.use("/admin", viewDoctor);

// app.use("/api/users", userRoutes);
// app.use("/login", authRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});