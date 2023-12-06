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

module.exports = { getProduct, getProducts, addProduct };
