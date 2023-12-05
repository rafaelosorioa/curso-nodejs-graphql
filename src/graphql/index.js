const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default');

// Scalar types define types and resolver for said types
// Added ! to avoid null values
// Define a new Object type

const typeDefs = `
  type Query{
    hello: String!
    getPerson(name: String, age : Int): String
    getInt(age: Int!): Int
    getFloat: Float
    getString: String
    getBoolean: Boolean
    getID: ID
    getNumbers(numbers: [Int!]!): [Int]
    getProduct: Product
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    image: String!
    createdAt: String!

  }
`;

// List definition for graphql
// [Int]
// [String]

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
    getProduct: () => ({
      id: '123',
      name: 'product',
      price: 100,
      description: 'product 1 description',
      image: 'image1.jpg',
      createdAt: new Date().toISOString(),
    }),
  },
};

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageProductionDefault,
      ApolloServerPluginLandingPageLocalDefault,
    ],
  });
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req }) => ({ token: req.headers.token }),
    })
  );
};

module.exports = useGraphql;
