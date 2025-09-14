import express from "express";

import { 
createCustomer,  
getCustomers , 
getCustomerById , 
updateCustomer , 
deleteCustomer 
}from "../controllers/customerController.js"


import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import wrapAsync from "../utils/wrapAsync.js";


const router = express.Router();

router.post("/customers", auth, requireRole("admin", "user"), wrapAsync(createCustomer));


router.get("/customers", auth, wrapAsync(getCustomers));


router.get("/customers/:id", auth, wrapAsync(getCustomerById));


router.put("/customers/:id", auth, wrapAsync(updateCustomer));


router.delete("/customers/:id", auth,requireRole("admin","user"),wrapAsync(deleteCustomer));


export default router;