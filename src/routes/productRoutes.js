// routes for product api

const router = require("express").Router();
const ctrl = require("../controllers/productController");
const {protect} = require('../middleware/authMiddleware');
const {authorize} = require('../middleware/roleMiddleware')

//admin only
router.post(
    "/", 
    protect, 
    authorize("ADMIN"),
    ctrl.createProduct);
router.put(
    "/:id", 
    protect, 
    authorize("ADMIN"),
    ctrl.updateProduct);
router.delete(
    "/:id",
    protect,
    authorize("ADMIN"),
    ctrl.deleteProduct);

//for user and admin
router.get(
    "/", 
    protect, 
    authorize("ADMIN", "USER"),
    ctrl.getProducts);
router.get(
    "/:id", 
    protect, 
    authorize("ADMIN", "USER"),
    ctrl.getProduct);

 
module.exports = router;