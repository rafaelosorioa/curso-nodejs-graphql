const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default');
const { loadFiles } = require('@graphql-tools/load-files');
const resolvers = require('./resolvers');

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
