const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContext } = require('graphql-passport');
const {
  typeDefs: scalarsTypeDefs,
  resolvers: scalarsResolvers,
} = require('graphql-scalars');

const resolvers = require('./resolvers');

const useGraphql = async (app) => {
  const allResolvers = [resolvers, scalarsResolvers];
  const typeDefs = [
    ...(await loadFiles('./src/**/**/*.graphql')),
    scalarsTypeDefs,
  ];
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [
      ApolloServerPluginLandingPageProductionDefault,
      ApolloServerPluginLandingPageLocalDefault,
    ],
  });

  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res }),
    })
  );
};

module.exports = useGraphql;
