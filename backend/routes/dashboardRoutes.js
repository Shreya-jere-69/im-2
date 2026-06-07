const express = require("express");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");

const router = express.Router();

// Dashboard summary
router.get("/summary", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalSales = await Sale.countDocuments();
    const totalPurchases = await Purchase.countDocuments();

    const lowStockProducts = await Product.countDocuments({
      quantity: { $gt: 0, $lte: 5 }
    });

    const outOfStockProducts = await Product.countDocuments({
      quantity: 0
    });

    const salesAmount = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    const purchaseAmount = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.status(200).json({
      totalProducts,
      totalSuppliers,
      totalSales,
      totalPurchases,
      lowStockProducts,
      outOfStockProducts,
      totalSalesAmount: salesAmount[0]?.total || 0,
      totalPurchaseAmount: purchaseAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard summary",
      error: error.message
    });
  }
});

// Low stock product list
router.get("/low-stock", async (req, res) => {
  try {
    const products = await Product.find({
      quantity: { $gt: 0, $lte: 5 }
    }).sort({ quantity: 1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch low stock products",
      error: error.message
    });
  }
});

// Out of stock product list
router.get("/out-of-stock", async (req, res) => {
  try {
    const products = await Product.find({
      quantity: 0
    }).sort({ updatedAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch out of stock products",
      error: error.message
    });
  }
});

module.exports = router;