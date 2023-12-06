const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const { addCategory } = require('./category.resolvers');
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
  },

  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
  },
  CategoryNameType,
};

module.exports = resolvers;
