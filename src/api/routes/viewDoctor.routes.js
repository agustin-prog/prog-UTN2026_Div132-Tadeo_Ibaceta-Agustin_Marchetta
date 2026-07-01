/*==========================
    Rutas de vistas doctor
============================*/
import { Router } from "express";
import { join, __dirname } from "../utils/index.js";
import { createDoctorView, deleteDoctorView, doctorView, getDoctorView, updateDoctorView } from "../controllers/view.controllers.js";

const router = Router();

////////////////////
// Vista principal
router.get("/index", doctorView);


////////////////////
// Vista obtener doctor
router.get("/consultar/doctor", getDoctorView);


////////////////////
// Vista crear doctor
router.get("/crear/doctor", createDoctorView);


////////////////////
// Vista modificar doctor
router.get("/modificar/doctor", updateDoctorView);


////////////////////
// Vista eliminar doctor
router.get("/eliminar/doctor", deleteDoctorView);

export default router;