import express from "express";

import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getClients);
router.post("/", auth, createClient);
router.patch("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);

export default router;
