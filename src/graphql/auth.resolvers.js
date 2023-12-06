const AuthService = require('./../services/auth.service');
const authService = new AuthService();

const login = async (_, { email, password }, context) => {
  const { user } = await context.authenticate('graphql-local', {
    email,
    password,
  });

  return authService.signToken(user);
};

module.exports = { login };
