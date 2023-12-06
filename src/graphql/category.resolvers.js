const CategoryService = require('./../services/category.service');
const categoryService = new CategoryService();

const addCategory = async (_, { dto }) => {
  const category = await categoryService.create(dto);
  return category;
};

module.exports = { addCategory };
