const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Add category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add category",
      error: error.message
    });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message
    });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      error: error.message
    });
  }
});

module.exports = router;