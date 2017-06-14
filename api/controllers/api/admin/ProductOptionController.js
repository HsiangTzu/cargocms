module.exports = {

  find: async (req, res) => {
    try {
      const { query, method, body } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      const include = [ProductOptionValue, Product];
      const isPost = method === 'POST';
      let mServerSidePaging = isPost ? body.serverSidePaging : serverSidePaging;
      let mQuery = isPost ? body : query;
      let result;
      if (mServerSidePaging) {
        result = await PagingService.process({ query: mQuery, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ProductOption.findOne({
        where:{
          id
        },
        include: [ProductOptionValue, Product]
      });
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;
      const productOptionData = {
        value: data.value,
        required: data.required,
        OptionId: null,
        ProductId: data.ProductId,
      };
      const item = await ProductOption.create(productOptionData);

      const productOptionValueData = {
        ...data.ProductOptionValue,
        OptionId: null,
        OptionVauleId: null,
        ProductOptionId: item.id,
        ProductId: item.ProductId
      };

      const productOptionValue = await ProductOptionValue.create(productOptionValueData);

      const findAllOptionQuantity = await ProductOptionValue.findAll({
        where: { ProductId: productOptionValueData.ProductId }
      });

      let totalOptionQuantity = 0;
      for(let item of findAllOptionQuantity) {
        totalOptionQuantity += item.quantity;
      }

      let findProduct = await Product.findOne({
        where: { id: data.ProductId }
      });

      findProduct.quantity = totalOptionQuantity;
      await findProduct.save();

      const message = 'Create success.';
      res.ok({ message, data: { item } } );
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const productOptionData = {
        value: data.value,
        required: data.required,
        ProductId: data.ProductId,
        deletedAt: null,
        OptionId: null,
      };
      const item = await ProductOption.update(productOptionData ,{
        where: { id, },
      });
      const productOptionValueData = data.ProductOptionValue;
      productOptionValueData.OptionId = null;
      productOptionValueData.OptionValueId = null;
      productOptionValueData.deletedAt = null;
      productOptionValueData.ProductId = data.ProductId;
  
      const productOptionValue = await ProductOptionValue.update(productOptionValueData ,{
        where: { ProductOptionId: id, },
      });

      const findAllOptionQuantity = await ProductOptionValue.findAll({
        where: { ProductId: productOptionValueData.ProductId }
      });

      let totalOptionQuantity = 0;
      for(let item of findAllOptionQuantity) {
        totalOptionQuantity += item.quantity;
      }

      let findProduct = await Product.findOne({
        where: { id: data.ProductId }
      });

      findProduct.quantity = totalOptionQuantity;
      await findProduct.save();

      const message = 'Update success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ProductOption.destroy({ where: { id } });
      await ProductOptionValue.destroy({ where: { ProductOptionId: id } });

      const findProductOption = await ProductOption.find({ where: { id } });
      const findAllOptionQuantity = await ProductOptionValue.findAll({
        where: { ProductId: findProductOption.ProductId }
      });

      let totalOptionQuantity = 0;
      for(let item of findAllOptionQuantity) {
        totalOptionQuantity += item.quantity;
      }

      let findProduct = await Product.findOne({
        where: { id: findProductOption.ProductId }
      });
      findProduct.quantity = totalOptionQuantity;
      await findProduct.save();

      let message = 'Delete success';
      res.ok({message, data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  }
}
