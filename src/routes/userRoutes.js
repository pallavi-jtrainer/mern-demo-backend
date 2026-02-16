const router = require('express').Router();

const ctrl = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');
const {authorize} = require('../middleware/roleMiddleware');

router.post(
    "/", 
    protect,
    authorize("ADMIN"),
    ctrl.createUser);
router.get(
    "/", 
    protect,
    authorize("ADMIN"),
    ctrl.getAllUsers);
router.get(
    "/active", 
    protect,
    authorize("ADMIN"),
    ctrl.getActiveUsers);
router.get(
    "/email/:email",
    protect,
    authorize("ADMIN"),
    ctrl.getUserByEmail);

module.exports = router;