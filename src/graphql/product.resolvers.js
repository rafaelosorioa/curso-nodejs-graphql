const ProductService = require('./../services/product.service');
const productService = new ProductService();

const getProduct = async (_, { id }) => {
  const product = await productService.findOne(id);
  return product;
};

const getProducts = async () => {
  const products = await productService.find({});
  return products;
};

const addProduct = async (_, { dto }) => {
  const newProduct = await productService.create(dto);
  return newProduct;
};

const updateProduct = async (_, { id, dto }) => {
  const updatedProduct = await productService.update(id, dto);
  return updatedProduct;
};

const deleteProduct = async (_, { id }) => {
  const deletedProduct = await productService.delete(id);
  return deletedProduct.id;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
