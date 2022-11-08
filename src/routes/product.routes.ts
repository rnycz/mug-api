import express, { Router } from "express";
import controller from "../controllers/product.controllers";

const router: Router = express.Router();

router.post("/create", controller.createProduct);
router.get("/get/:productId", controller.getProduct);
router.get("/get", controller.getAllProducts);
router.put("/update/:productId", controller.updateProduct);
router.delete("/delete/:productId", controller.deleteProduct);

export default router;
