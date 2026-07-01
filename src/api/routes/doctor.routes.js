/*========================
    Rutas de doctor
========================*/
import {Router} from "express";
import { validateDoctor, validateId } from "../middlewares/middlewares.js";
import {createDoctor, getAllDoctors, getDoctorById, modifyDoctor, removeDoctor} from "../controllers/doctor.controllers.js"

const router = Router();

// GET all doctores
router.get("/", getAllDoctors);


// GET by id
router.get("/:id", validateId, getDoctorById);


// POST doctor
router.post("/", validateDoctor, createDoctor);


// UPDATE doctor
router.put("/:id", validateId, modifyDoctor);


// DELETE doctor
router.delete("/:id", validateId, removeDoctor);


// Exportamos todas las rutas y las centralizamos en el archivo de barril -> index.js
export default router;