const express = require("express");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const router = express.Router();

// Add purchase and increase stock
router.post("/", async (req, res) => {
  try {
    const { productId, supplierName, quantity, purchasePrice } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const totalAmount = quantity * purchasePrice;

    const purchase = await Purchase.create({
      product: product._id,
      productName: product.name,
      supplierName,
      quantity,
      purchasePrice,
      totalAmount
    });

    product.quantity = product.quantity + quantity;
    await product.save();

    res.status(201).json({
      message: "Purchase added successfully",
      purchase,
      updatedStock: product.quantity
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add purchase",
      error: error.message
    });
  }
});

// Get all purchases
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch purchases",
      error: error.message
    });
  }
});

// Get single purchase
router.get("/:id", async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate("product");

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch purchase",
      error: error.message
    });
  }
});

// Delete purchase and reduce product stock
router.delete("/:id", async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    const product = await Product.findById(purchase.product);

    if (product) {
      if (product.quantity < purchase.quantity) {
        return res.status(400).json({
          message: "Cannot delete purchase because current stock is lower than purchase quantity"
        });
      }

      product.quantity = product.quantity - purchase.quantity;
      await product.save();
    }

    await Purchase.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Purchase deleted successfully and stock reduced"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete purchase",
      error: error.message
    });
  }
});

module.exports = router;