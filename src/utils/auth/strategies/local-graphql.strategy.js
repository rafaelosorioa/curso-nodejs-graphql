const { GraphQLLocalStrategy } = require('graphql-passport');
const AuthService = require('./../../../services/auth.service');

const authService = new AuthService();

const GQLLocalStrategy = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const user = await authService.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = GQLLocalStrategy;
