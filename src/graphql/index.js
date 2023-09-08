const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default');

const typeDefs = `type Query{
  hello: String
  getPerson(name: String, age : Int): String
}`;

// GET = Query
// POST, PUT, PATCH, DELETE = mutations

const resolvers = {
  Query: {
    hello: () => 'Hola Mundo',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I'm ${args.age} years old`,
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
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
};

module.exports = useGraphql;
