const checkJwtGql = require('./../utils/auth/checkJWTGql');
const checkRolesGql = require('./../utils/auth/checkRolesGql');
const CategoryService = require('./../services/category.service');
const categoryService = new CategoryService();

const addCategory = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  const category = await categoryService.create(dto);
  return category;
};

module.exports = { addCategory };
