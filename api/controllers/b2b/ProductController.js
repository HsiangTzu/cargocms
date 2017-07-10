module.exports = {
  index: async (req, res) => {
    try{
      let {start, length, category, supplier, limit} = req.query;

      if( !category ){
        category = 1;
      }

      const result = await ProductService.find({
        start,
        length,
        categoryId: category,
        supplierId: supplier,
        limit
      });

      let categorys = await Category.findAll({
        order: 'sortOrder asc',
        include: CategoryDescription
      });

      // categorys = categorys.map(function( category ){
      //   return category.CategoryDescription.name;
      // });
      sails.log('banner=>', sails.config.layoutImages.banner)
      sails.log('banner=>', sails.config.layoutImages.indexLogo)
      res.view('index',
        {
          data:{
            items: result,
            categorys,
          },
          layoutImages: {
            banner: sails.config.layoutImages.banner[0],
            indexLogo: sails.config.layoutImages.indexLogo[0],
          },
          errors: req.flash('error')[0],
        }
      );
    } catch (e) {
      sails.log.error(e);
    }
  },

  detail: async (req, res) => {
    try{
      let item = await Product.findOne({
        where: {
          id: req.params.id
        },
        include: [ProductDescription, ProductOption, ProductOptionValue, ProductImage],
        layoutImages: {
          bannerLogo: sails.config.layoutImages.bannerLogo[0],
        }
      });
      sails.log('banner=>', sails.config.layoutImages.bannerLogo)
      res.view('b2b/product/detail',{
        data: {
          item,
        }
      });
    } catch (e) {
      sails.log.error(e);
    }
  },
};
