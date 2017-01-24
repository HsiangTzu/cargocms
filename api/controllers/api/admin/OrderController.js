import moment from 'moment';
import sh from 'shorthash';

module.exports = {

  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = [OrderStatus, OrderProduct];
        result = await PagingService.process({query, modelName, include});
      } else {
        const items = await sails.models[modelName].findAll({
          include: [OrderStatus, OrderProduct]
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
      const item = await Order.findOne({
        where: {
          id: id
        },
        include: [OrderStatus, OrderProduct]
      });
      res.ok({ data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;

      data.customField = '';
      data.paymentCompany = '';
      data.paymentAddress2 = '';
      data.paymentCountry = '';
      data.paymentCountryId = 0;
      data.paymentZone = '';
      data.paymentZoneId = 0;
      data.paymentAddressFormat = '';
      data.paymentCustomField = '';
      data.shippingCompany = '';
      data.shippingAddress2 = '';
      data.shippingCountry = '';
      data.shippingCountryId = 0;
      data.shippingZone = '';
      data.shippingZoneId = 0;
      data.shippingAddressFormat = '';
      data.shippingCustomField = '';
      data.commission = 0.0;
      data.marketingId = 0;
      data.languageId = 0;
      data.ip = '';
      data.forwardedIp = '';
      data.userAgent = '';
      data.acceptLanguage = '';

      const message = 'Create success.';
      const item = await Order.create(data);

      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      data.customField = '';
      data.paymentCompany = '';
      data.paymentAddress2 = '';
      data.paymentCountry = '';
      data.paymentCountryId = 0;
      data.paymentZone = '';
      data.paymentZoneId = 0;
      data.paymentAddressFormat = '';
      data.paymentCustomField = '';
      data.shippingCompany = '';
      data.shippingAddress2 = '';
      data.shippingCountry = '';
      data.shippingCountryId = 0;
      data.shippingZone = '';
      data.shippingZoneId = 0;
      data.shippingAddressFormat = '';
      data.shippingCustomField = '';
      data.commission = 0.0;
      data.marketingId = 0;
      data.languageId = 0;
      // data.ip = '';
      // data.forwardedIp = '';
      // data.userAgent = '';
      data.acceptLanguage = '';

      const message = 'Update success.';
      const item = await Order.update(data ,{
        where: { id, },
      });
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Order.destroy({ where: { id } });
      const message = 'Delete success.';
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  confirm: async (req, res) => {
    try{
      const { id } = req.params;
      let { tracking, orderConfirmComment } = req.body;
      orderConfirmComment = orderConfirmComment || '';
      const orderStatus = await OrderStatus.findOne({where:{name: 'PROCESSING'}})

      let order = await Order.findById(id);
      order.tracking = tracking;
      order.OrderStatusId = orderStatus.id;
      await order.save();

      await OrderHistory.create({
        notify: true,
        // comment: `訂單 ID: ${id} 確認訂單，確認理由：${orderConfirmComment}.`,
        comment: `訂單 ID: ${id} 確認訂單.`,
        OrderId: order.id
      });

      sails.log.info('Order CONFIRM', Order);

      let orderProducts = await OrderProduct.findAll({
        where:{
          OrderId: id
        },
        include:[ Order, Product]
      });

      let suppliers = [];
      for( let order of orderProducts){
        if(suppliers.indexOf(order.Product.SupplierId) === -1){
          suppliers.push( order.Product.SupplierId );
        }
      }

      const orderProductsData = orderProducts.map((data) => {
        return {
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          total: data.total
        }
      })

      for( let supplier of suppliers){

        let shipOrderNumber = await OrderService.orderNumberGenerator({modelName: 'suppliershiporder',userId: order.UserId, product: orderProductsData});
        sails.log.info('產生出貨單編號:', shipOrderNumber);

        let supplierShipOrder = await SupplierShipOrder.create({
          shipOrderNumber: shipOrderNumber,
          OrderId: id,
          SupplierId: supplier,
          invoiceNo: order.invoiceNo,
          invoicePrefix: order.invoicePrefix,
          firstname: order.firstname,
          lastname: order.lastname,
          email: order.email,
          telephone: order.telephone,
          fax: order.fax,
          customField: order.customField,
          paymentFirstname: order.paymentFirstname,
          paymentLastname: order.paymentLastname,
          paymentCompany: order.paymentCompany,
          paymentAddress1: order.paymentAddress1,
          paymentAddress2: order.paymentAddress2,
          paymentCity: order.paymentCity,
          paymentPostcode: order.paymentPostcode,
          paymentCountry: order.paymentCountry,
          paymentCountryId: order.paymentCountryId,
          paymentZone: order.paymentZone,
          paymentZoneId: order.paymentZoneId,
          paymentAddressFormat: order.paymentAddressFormat,
          paymentCustomField: order.paymentCustomField,
          paymentMethod: order.paymentMethod,
          paymentCode: order.paymentCode,
          shippingFirstname: order.shippingFirstname,
          shippingLastname: order.shippingLastname,
          shippingCompany: order.shippingCompany,
          shippingAddress1: order.shippingAddress1,
          shippingAddress2: order.shippingAddress2,
          shippingCity: order.shippingCity,
          shippingPostcode: order.shippingPostcode,
          shippingCountry: order.shippingCountry,
          shippingCountryId: order.shippingCountryId,
          shippingZone: order.shippingZone,
          shippingZoneId: order.shippingZoneId,
          shippingAddressFormat: order.shippingAddressFormat,
          shippingCustomField: order.shippingCustomField,
          shippingMethod: order.shippingMethod,
          shippingCode: order.shippingCode,
          comment: order.comment,
          total: 0,
          commission: order.commission,
          tracking: order.tracking,
          ip: order.ip,
          forwardedIp: order.forwardedIp,
          userAgent: order.userAgent,
          acceptLanguage: order.acceptLanguage,
          status: 'NEW',
        });

        const supplierName = await Supplier.findById(supplier);

        await SupplierShipOrderHistory.create({
          SupplierShipOrderId: supplierShipOrder.id,
          notify: true,
          comment: `訂單 ID: ${supplierShipOrder.OrderId} 已確認，建立 ${supplierName.name} 供應商出貨單 ID:${supplierShipOrder.id}.`
        });

        let orderProductTotal = 0;
        for( let orderProduct of orderProducts ){
          if( orderProduct.Product.SupplierId === supplier ){
            await SupplierShipOrderProduct.create({
              SupplierShipOrderId: supplierShipOrder.id,
              ProductId: orderProduct.ProductId,
              name: orderProduct.name,
              model: orderProduct.model,
              quantity: orderProduct.quantity,
              price: orderProduct.price,
              total: orderProduct.total,
              tax: orderProduct.tax,
              status: 'NEW',
            });

            orderProductTotal += orderProduct.total;
          }
        }

        supplierShipOrder.total = orderProductTotal;
        await supplierShipOrder.save();
      }

      const messageConfig = await MessageService.paymentConfirm({
        email: order.email,
        serialNumber: Order.orderNumber,
        username: `${order.lastname}${order.firstname}`,
      });
      const mail = await Message.create(messageConfig);
      await MessageService.sendMail(mail);

      const message = 'Success Confirm Order';
      const item = order;
      res.ok({ message, data: { item } });
    } catch (e) {
      res.serverError(e);
    }
  },

  updateStatus: async (req, res) => {
    try{
      const { id } = req.params;
      const { status } = req.body;

      const orderStatus = await OrderStatus.findOne({
        where: {
          name: status
        }
      });

      const item = await Order.find({
        where: {
          id,
        },
      });
      item.OrderStatusId = orderStatus.id;
      await item.save();

      await OrderHistory.create({
        notify: true,
        comment: `訂單 ID:${id} 變更狀態為:${status}`,
        OrderId: id,
        OrderStatudId: orderStatus.id
      });

      let messageConfig, mail;
      switch (status) {
        case 'PROCESSING':
          console.log('mail@PROCESSING');
          messageConfig = await MessageService.orderConfirm({
            email: item.email,
            serialNumber: item.orderNumber,
            username: `${item.lastname}${item.firstname}`,
          });
          break;
      }
      mail = await Message.create(messageConfig);
      await MessageService.sendMail(mail);

      const message = '訂單狀態變更成功.';
      const itemId = item.id;
      res.ok({ message, data: { itemId } });

    } catch (e) {
      res.serverError(e);
    }
  }
}
