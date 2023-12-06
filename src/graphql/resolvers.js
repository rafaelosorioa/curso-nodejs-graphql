const { getProduct, getProducts, addProduct } = require('./product.resolvers');

// GET = Query
// POST, PUT, PATCH, DELETE = mutations

const resolvers = {
  Query: {
    hello: () => 'Hola Mundo',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I'm ${args.age} years old`,
    getInt: (_, args) => args.age,
    getFloat: () => 1.1,
    getString: () => 'Hello World',
    getBoolean: () => true,
    getID: () => '12121212',
    getNumbers: (_, args) => args.numbers,
    //Products resolvers
    product: getProduct,
    products: getProducts,
  },

  Mutation: {
    addProduct,
  },
};

module.exports = resolvers;
