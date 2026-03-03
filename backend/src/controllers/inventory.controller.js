import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Inventory } from "../models/inventory.model.js";

//add new product
const addProduct = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can add product.");
  }
  const { productName, productNo, type, price, quantity } = req.body;
  if (
    !productName ||
    !productNo ||
    !type ||
    price == null ||
    quantity == null
  ) {
    throw new ApiError(400, "all fields are required.");
  }
  const existingProduct = await Inventory.findOne({ productNo });
  if (existingProduct) {
    throw new ApiError(409, "Product is already added in database.");
  }
  const product = await Inventory.create({
    productName,
    productNo,
    type,
    price,
    quantity,
  });
  if (!product) {
    throw new ApiError(404, "Product could not be added.");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "product added successfully."));
});

//update product
const updateProductDetails = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can update product.");
  }
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(400, "product id is required.");
  }
  const { productName, productNo, type, price } = req.body;
  if (!productName && !productNo && !type && price === undefined) {
    throw new ApiError(400, "atleast one field is required.");
  }
  if (productNo) {
    const exists = await Inventory.findOne({ productNo });
    if (exists && exists._id.toString() !== productId) {
      throw new ApiError(409, "Product number already exists");
    }
  }
  const updateFields = {};
  if (productName !== undefined) updateFields.productName = productName;
  if (productNo !== undefined) updateFields.productNo = productNo;
  if (type !== undefined) updateFields.type = type;
  if (price !== undefined) updateFields.price = price;
  const product = await Inventory.findByIdAndUpdate(
    productId,
    {
      $set: updateFields,
    },
    { new: true },
  );
  if (!product) {
    throw new ApiError(404, "product not found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "product updated successfully."));
});

//delete product
const deleteProduct = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can delete product");
  }
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(400, "product id is required.");
  }
  const deletedProduct = await Inventory.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new ApiError(404, "product not found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "product delete successfully."));
});

//increase quantity
const incrementQuantity = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can update quantity");
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    throw new ApiError(400, "valid increment quantity required");
  }

  const product = await Inventory.findByIdAndUpdate(
    productId,
    { $inc: { quantity: quantity } },
    { new: true },
  );

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "quantity increased successfully"));
});

//decrese quantity
const decrementQuantity = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can update quantity");
  }
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    throw new ApiError(400, "valid decrement amount required");
  }

  const product = await Inventory.findOneAndUpdate(
    {
      _id: productId,
      quantity: { $gte: quantity },
    },
    { $inc: { quantity: -quantity } },
    { new: true },
  );

  if (!product) {
    throw new ApiError(400, "insufficient stock or product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "quantity decreased successfully"));
});

// get all product
const allProduct = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "only admin can update quantity");
  }
  const allProduct = await Inventory.find();
  if (!allProduct) {
    throw new ApiError(404, "products not found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allProduct, "all product is fetched."));
});

export {
  addProduct,
  updateProductDetails,
  deleteProduct,
  incrementQuantity,
  decrementQuantity,
  allProduct,
};
