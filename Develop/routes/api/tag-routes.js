const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!tagData) {
      res.status(400).json({'message': "Tag id is not found, please utilize valid id"});
    }
    res.status(200).json(tagData);
  } 
  catch (err) {
    res.status(400).json(err)
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{ 
    const tag = await Tag.create(req.body);
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.productIds.length) {
          const tagProductIdArr = req.body.productIds.map((product_id) => {
            return {
              tag_id: tag.id,
              product_id,
            };
          });
         const tagProductIds = await ProductTag.bulkCreate(tagProductIdArr);
         res.status(200).json(tagProductIds);
        }
        // if no product tags, just respond
        res.status(200).json(tag);
      }
      catch (err) {
        res.status(400).json(err);
      }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {  
    // update product data
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })  
        // find all associated tags from ProductTag
        const associatedProductTags = await ProductTag.findAll({ where: { tag_id: req.params.id } });
        // get list of current tag_ids
        const tagIds = productTags.map(({ product_id }) => product_id);
        // create filtered list of new tag_ids
        const newTagIds = req.body.productIds
          .filter((product_id) => !tagIds.includes(product_id))
          .map((product_id) => {
            return {
              tag_id: req.params.id,
              product_id,
            };
          });
        // figure out which ones to remove
        const tagsToRemove = associatedProductTags
          .filter(({ product_id }) => !req.body.productIds.includes(product_id))
          .map(({ id }) => id);
  
        // run both actions
        const updatedTags = await Promise.all([
          ProductTag.destroy({ where: { id: tagsToRemove } }),
          ProductTag.bulkCreate(newTagIds),
        ]);
        res.status(200).json(updatedTags);
      }
      catch (err) {
        // console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTagById = await Tag.findByPk(req.params.id);
    //delete product by its id value
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTagById) {
      res.status(400).json({'message': 'Please utilize valid id for deletion'});
    }
    res.status(200).json([{'message': 'These are your deleted tags'}, 
    {id: deletedTagById.id, tag_name: deletedTagById.tag_name}]);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
