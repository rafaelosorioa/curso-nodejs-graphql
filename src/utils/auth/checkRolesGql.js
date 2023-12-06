const boom = require('@hapi/boom');

const checkRolesGql = (user, ...roles) => {
  if (!roles.includes(user.role))
    throw boom.unauthorized('your role is not allowed');
};

module.exports = checkRolesGql;
