const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'game',
  },
  {
    tag_name: 'manga',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'music',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
