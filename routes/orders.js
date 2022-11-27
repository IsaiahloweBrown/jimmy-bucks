const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const ordersController = require("../controllers/orders");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, ordersController.getOrder);

router.post("/createOrder", upload.single("file"), ordersController.createOrder);

router.put("/likeOrder/:id", ordersController.likeOrder);

router.delete("/deleteOrder/:id", ordersController.deleteOrder);

module.exports = router;
