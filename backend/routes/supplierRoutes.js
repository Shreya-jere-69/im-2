const express = require("express");
const Supplier = require("../models/Supplier");

const router = express.Router();

// Add supplier
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const supplier = await Supplier.create({
      name,
      phone,
      email,
      address
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add supplier",
      error: error.message
    });
  }
});

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch suppliers",
      error: error.message
    });
  }
});

// Get single supplier
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch supplier",
      error: error.message
    });
  }
});

// Update supplier
router.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update supplier",
      error: error.message
    });
  }
});

// Delete supplier
router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json({
      message: "Supplier deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete supplier",
      error: error.message
    });
  }
});

module.exports = router;