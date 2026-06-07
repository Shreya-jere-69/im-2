const express = require("express");
const Sale = require("../models/Sale");
const Product = require("../models/Product");

const router = express.Router();

// Add sale and reduce stock
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, sellingPrice, customerName } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough stock available"
      });
    }

    const totalAmount = quantity * sellingPrice;

    const sale = await Sale.create({
      product: product._id,
      productName: product.name,
      quantity,
      sellingPrice,
      totalAmount,
      customerName
    });

    product.quantity = product.quantity - quantity;
    await product.save();

    res.status(201).json({
      message: "Sale added successfully",
      sale,
      remainingStock: product.quantity
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add sale",
      error: error.message
    });
  }
});

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales",
      error: error.message
    });
  }
});

// Get single sale
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate("product");

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sale",
      error: error.message
    });
  }
});

// Delete sale and restore product stock
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    const product = await Product.findById(sale.product);

    if (product) {
      product.quantity = product.quantity + sale.quantity;
      await product.save();
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Sale deleted successfully and stock restored"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete sale",
      error: error.message
    });
  }
});

module.exports = router;