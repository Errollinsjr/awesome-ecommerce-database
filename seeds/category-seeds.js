const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Games',
  },
  {
    category_name: 'Movies',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Books',
  },
  {
    category_name: 'Manga',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
