const userModel = require("../../model/userModel");
const shipmentModel = require("../../model/shipmentModel");
const journalModel = require("../../model/journalModel");
const crypto = require('crypto');
const { log } = require("console");


const createShipment = async (req, res) => {
    const { shipper, weight, description, user_id } = req.body;
    try {
        if (!(shipper && weight && description && user_id)) {
            return res.status(400).send({ Message: "Some inputs are missing" });
        }

        // Validate if user exist in our database
        const user = await userModel.findById(user_id);
        if (user == null) {
            return res.status(404).send({ Message: "User not found" });
        }

        let shipment_image;
        if (req.file) {
            shipment_image = `${process.env.IMG_URL}/images/${req.file.filename}`;
        }

        const randomCode = crypto.randomBytes(4).toString('hex');
        const existingCode = await shipmentModel.findOne({ code: randomCode });
        if (existingCode) {
            return generateUniqueCode();
        }


        let price;
        if (weight >= 1 && weight <= 9) {
            price = 10;
        } else if (weight >= 10 && weight <= 24) {
            price = 100;
        } else {
            price = 300;
        }

        const newShipment = {
            code: randomCode,
            shipper: shipper,
            weight: weight,
            description: description,
            shipment_image: shipment_image,
            user_id: user_id,
            price: price,
        }

        const shipment = await shipmentModel.create(newShipment);
        return res.status(201).send({ Message: "Shipment successfully added", shipment: shipment });

    } catch (error) {
        return res
            .status(500)
            .send({ Message: "Internal Server Error. Please contact with managers" });
    }
}

const getAllShipment = async (req, res) => {
    try {
        const shipment = await shipmentModel.find({});
        if (shipment.length > 0) {
            return res.status(200).send(shipment);
        } else {
            return res.status(404).json({ Message: "No Shipment Found" });
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." });
    }
}

const getShipmentById = async (req, res) => {
    try {
        const shipment = await shipmentModel.findById(req.params.id);
        if (shipment) {
            return res.status(200).send(shipment);
        } else {
            return res.status(404).send({ Message: "shipment Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ Message: "Error In Retrieval" });
    }
}

const updateShipment = async (req, res) => {
    try {
        let updatedshipment;
        let shipment_image;
        const shipment_id = req.params.ship_id;

        const lastShipment = await shipmentModel.findById(shipment_id);


        if (req.file) {
            shipment_image = `${process.env.IMG_URL}/images/${req.file.filename}`;
            updatedshipment = { ...req.body, shipment_image: shipment_image };
        } else {
           
            updatedshipment = { ...req.body };
            updatedshipment.shipment_image = lastShipment.shipment_image;
        }

        
         if (updatedshipment.weight >= 1 && updatedshipment.weight <= 9) {
            updatedshipment.price = 10;
         } else if (updatedshipment.weight >= 10 && updatedshipment.weight <= 24) {
            updatedshipment.price = 100;
         } else {
            updatedshipment.price = 300;
         }

        if (updatedshipment.status == "done") {
            createJournal(updatedshipment.price, "Debit Cash", req.params.ship_id);
            createJournal((updatedshipment.price * 20 / 100), "Credit Revenue", req.params.ship_id);
            createJournal((updatedshipment.price * 80 / 100), "Credit Payable", req.params.ship_id);
        }

        const shipment = await shipmentModel.findByIdAndUpdate(
            req.params.ship_id,
            updatedshipment,
            { new: true }
        );

        if (shipment) {
            return res.status(200).send({ Message: "Updated Successfully" });
        } else {
            return res.status(404).json({ Message: "shipment isn't Exist" });
        }

    } catch (error) {
        return res.status(500).send({ Message: "Error in Update" });
    }
};

const createJournal = async (amount, type, shipment_id) => {
    try {
        if (!(amount && type && shipment_id)) {
            return res.status(400).send({ Message: "Some inputs are missing" });
        }

        // Validate if user exist in our database
        const ship = await shipmentModel.findById(shipment_id);
        if (ship == null) {
            return res.status(404).send({ Message: "shipment not found" });
        }

        const newJournal = {
            amount: amount,
            type: type,
            shipment_id: shipment_id,
        }
         

        const Journal = await journalModel.create(newJournal);
        
        return ({ Message: "Journal successfully added", Journal: Journal });
    } catch (error) {
        return ({ Message: "Internal Server Error. Please contact with managers" });
    }
}

module.exports = {
    createShipment,
    getAllShipment,
    getShipmentById,
    updateShipment,
}