const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default');
const { loadFiles } = require('@graphql-tools/load-files');

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
    typeDefs: await loadFiles('./src/**/**/*.graphql'),
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
