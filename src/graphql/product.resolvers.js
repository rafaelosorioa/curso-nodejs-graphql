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

module.exports = { getProduct, getProducts };
