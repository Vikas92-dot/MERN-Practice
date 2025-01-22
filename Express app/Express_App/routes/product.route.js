import express from "express";
import {editProductAction, addProductAction, addProductPage, deleteProduct, editProductPage, viewProductPage } from "../controller/product.controller.js";
import { verify } from "../middleware/auth.js";
const router = express.Router();

router.get("/add-product",verify,addProductPage);
router.post("/add-product",verify,addProductAction);
router.get("/view-product",verify,viewProductPage);
router.get("/delete/:productId",verify,deleteProduct);
router.get("/edit/:productId",verify,editProductPage);
router.post("/edit-product",verify,editProductAction);
export default router;