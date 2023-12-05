const getProduct = (_, { id }) => ({
  id,
  name: 'product',
  price: 100,
  description: 'product 1 description',
  image: 'image1.jpg',
  createdAt: new Date().toISOString(),
});

const getProducts = () => [];

module.exports = { getProduct, getProducts };
