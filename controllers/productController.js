const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, owner: req.user });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const filters = {};
  if (req.query.category) filters.category = req.query.category;
  if (req.query.brand) filters.brand = req.query.brand;
  if (req.query.minPrice)
    filters.price = { $gte: req.query.minPrice };
  if (req.query.maxPrice)
    filters.price = { ...filters.price, $lte: req.query.maxPrice };

  const products = await Product.find(filters);
  res.json(products);
};

exports.getProductById = async (req, res) => {
  res.json(await Product.findById(req.params.id));
};

exports.updateProduct = async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
