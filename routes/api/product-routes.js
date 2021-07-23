const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    });
    if(!productData) {
      res.status(400).json({'message': "Product id is not found, please utilize valid id"});
    }
    res.status(200).json(productData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 try{ 
  const product = await Product.create(req.body);
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
       const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
       res.status(200).json(productTagIds);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    }
    catch (err) {
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
try {  
  // update product data
  const product = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })  
      // find all associated tags from ProductTag
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      const updatedProductTags = await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
      res.status(200).json(updatedProductTags);
    }
    catch (err) {
      // console.log(err);
      res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProductById = await Product.findByPk(req.params.id);
    //delete product by its id value
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedProductById) {
      res.status(400).json({'message': 'Please utilize valid id for deletion'});
    }
    res.status(200).json([{'message': 'These are your deleted products'}, 
    {id: deletedProductById.id, product_name: deletedProductById.product_name}]);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

//first we're going to try deleting product by id
//then we're going to wait then destroy it where the params are id
//then if it not a valid id it iwll throw a message after the if statement
//if it is a valid id, u get a 200 and proper message of what was deleted
//latestly, u have your general catch all after try for any general exceptions

module.exports = router;
