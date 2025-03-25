import express from "express";
import {
    getAllCompanions,
    getCompanionById,
    createCompanion,
    updateCompanion,
    deleteCompanion,
} from "../controllers/CompanionController.js";


const companionRouter = express.Router();

companionRouter.get("/", getAllCompanions);
companionRouter.get("/:id", getCompanionById);
companionRouter.post("/", createCompanion);
companionRouter.put("/", updateCompanion);
companionRouter.delete("/", deleteCompanion);

export default companionRouter;