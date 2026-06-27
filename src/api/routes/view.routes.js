/*========================
    Rutas de vistas
========================*/

import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { doctorView, getDoctorView, createDoctorView, updateDoctorView, deleteDoctorView  } from "../controllers/viewDoctor.controllers.js";

const router = Router();

////////////////////
// Vista principal
router.get("/indexDoctores", doctorView); // como se llamaria


////////////////////
// Vista obtener doctor
router.get("/consultar", getDoctorView);


////////////////////
// Vista crear doctor
router.get("/crear", createDoctorView);


////////////////////
// Vista modificar doctor
router.get("/modificar", updateDoctorView);


////////////////////
// Vista eliminar doctor
router.get("/eliminar", deleteDoctorView);

export default router;