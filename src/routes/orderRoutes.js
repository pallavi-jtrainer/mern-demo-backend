const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const {protect} = require('../middleware/authMiddleware');
const {authorize} = require('../middleware/roleMiddleware');

router.post("/", protect, authorize("ADMIN", "USER"), ctrl.createOrder);
router.get("/", protect, authorize("ADMIN"), ctrl.getAllOrders);

module.exports = router;