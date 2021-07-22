const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!categorytData) {
      res.status(400).json({'message': "Category id is not found, please utilize valid id"});
    }
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{ 
    const category = await Category.create({category_name: req.body.category_name});        
        res.status(200).json(category);
        res.status(200).json([{'message': 'Category added successfully.'}, 
        {id: catData.id, category_name: catData.category_name}]);
      }
      catch (err) {
        res.status(400).json(err);
      }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(400).json({'message': 'Not a valid category id'});
    }
    res.status(200).json([{'message': 'Category updated: '}, 
    {id: req.body.id, category_name: req.body.category_name}]);
  } catch (err) {
    res.status(400).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    // utilize destroy where the categories id matches up  
    await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    // if 400 post message below, if not then success
    if(!category) {
      res.status(400).json({'message': "Category not found, deletion not plausible"})
    }
    res.status(200).json([{'message': "Category deleted: "}, 
    {id: catDataDeleted.id, category_name: catDataDeleted.category_name}])
  }
  catch {
    res.status(400).json(err);
  }
});

module.exports = router;
