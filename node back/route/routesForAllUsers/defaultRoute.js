const express = require("express");
const { loginAuth } = require("../../controller/auth/logInAuth");
const { registerAuth , getAllUser } = require("../../controller/auth/registerAuth");
const upload = require("../../middleware/multer");
const { createShipment, getAllShipment, getShipmentById, updateShipment } = require("../../controller/shipment/shipment");
const router = express.Router();

//=============Register==========================================
router.post("/register", upload.single("user_image"), registerAuth);
router.get("/user", getAllUser);

//=============Login===========================================
router.post("/login", loginAuth);

//=============CreateShipment===========================================
router.post("/shipment", upload.single("shipment_image"), createShipment);
router.get("/shipment", getAllShipment);
router.get("/shipment/:id", getShipmentById);
router.patch("/shipment/:ship_id", upload.single("shipment_image"), updateShipment);

module.exports = router;