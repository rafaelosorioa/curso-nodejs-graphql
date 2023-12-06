const boom = require('@hapi/boom');

const checkRolesGql = require('./../utils/auth/checkRolesGql');
const CategoryService = require('./../services/category.service');
const categoryService = new CategoryService();

const addCategory = async (_, { dto }, context) => {
  const { user } = await context.authenticate('jwt', { session: false });
  if (!user) throw boom.unauthorized('jwt is not valid');
  checkRolesGql(user, 'admin');
  const category = await categoryService.create(dto);
  return category;
};

module.exports = { addCategory };
