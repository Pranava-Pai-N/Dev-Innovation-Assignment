import express from "express";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import { createLead, getLeads, getLeadById, updateLead, deleteLead } from "../controllers/leads.controller.js";
import wrapAsync from "../utils/wrapAsync.js";


const router = express.Router({ mergeParams: true });


router.post("/customers/:customerId/leads", auth, requireRole("admin", "user"), wrapAsync(createLead));


router.get("/customers/:customerId/leads", auth, requireRole("admin", "user"), wrapAsync(getLeads));


router.get("/customers/:customerId/leads/:leadId", auth, requireRole("admin", "user"), wrapAsync(getLeadById));


router.put("/customers/:customerId/leads/:leadId", auth, requireRole("admin", "user"), wrapAsync(updateLead));


router.delete("/customers/:customerId/leads/:leadId", auth, requireRole("admin"), wrapAsync(deleteLead));



export default router;
