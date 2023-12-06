const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const {
  addCategory,
  getCategory,
  getCategories,
} = require('./category.resolvers');
const { RegularExpression } = require('graphql-scalars');

const CategoryNameType = new RegularExpression(
  'CategoryNameType',
  /^[a-zA-Z]{3,8}$/
);

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
    category: getCategory,
    categories: getCategories,
  },

  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  },
};

module.exports = resolvers;
