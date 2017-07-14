
module.exports = {
  attributes: {
    orderNumber: {
      type: Sequelize.STRING(48),
      allowNull: false
    },
    invoiceNo: {
      type: Sequelize.STRING(48),
      defaultValue: 0,
      allowNull: false,
    },
    invoicePrefix: {
      type: Sequelize.STRING(26),
      allowNull: false,
    },
    // 多商場功能
    // storeId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    // storeName: {
    //   type: Sequelize.STRING(64),
    //   allowNull: false,
    // },
    // storeUrl: {
    //   type: Sequelize.STRING(255),
    //   allowNull: false,
    // },

    // customerId、customerGroupId 可用於選擇客戶群體來打折產品
    // customerId: {
    //   type: Sequelize.INTEGER(11),
    //   defaultValue: 0,
    //   allowNull: false,
    // },
    // customerGroupId: {
    //   type: Sequelize.INTEGER(11),
    //   defaultValue: 0,
    //   allowNull: false,
    // },

    firstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(96),
      allowNull: false,
    },
    telephone: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    fax: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    customField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentFirstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    paymentLastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    paymentCompany: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    paymentAddress1: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentAddress2: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCity: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentPostcode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    paymentCountry: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCountryId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    paymentZone: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentZoneId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    paymentAddressFormat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentCustomField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    paymentCode: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingFirstname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    shippingLastname: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    shippingCompany: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    shippingAddress1: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingAddress2: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCity: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingPostcode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    shippingCountry: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCountryId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    shippingZone: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingZoneId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    shippingAddressFormat: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    shippingCustomField: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    shippingMethod: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    shippingCode: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    deliveryNumber: {
      type: Sequelize.STRING(128),
      allowNull: true,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    total: {
      type: Sequelize.DECIMAL(15,4),
      defaultValue: '0.000',
      allowNull: false,
    },

    // 聯盟
    // http://docs.opencart.com/marketing/affiliate/
    // affiliateId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },

    commission: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: false,
    },
    // marketingId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    tracking: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    languageId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },

    // 貨幣
    // currencyId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    // },
    // currencyCode: {
    //   type: Sequelize.STRING(3),
    //   allowNull: false,
    // },
    // currencyValue: {
    //   type: Sequelize.DECIMAL(15, 8),
    //   defaultValue: '1.00000000',
    //   allowNull: false,
    // },

    ip: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    forwardedIp: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    userAgent: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    acceptLanguage: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    token: {
      type: Sequelize.STRING(32),
      unique: true,
    },

    totalIncludeTax: {
      type: Sequelize.DECIMAL(15,4),
      defaultValue: '0.000',
      allowNull: false,
    },

    tax: {
      type: Sequelize.DECIMAL(15,4),
      defaultValue: '0.000',
      allowNull: false,
    },

    shippingEmail: {
      type: Sequelize.STRING(96),
      allowNull: false,
    },

    shippingTelephone: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },


    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    status: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          const status = this.getDataValue('OrderStatus');
          return status ? status.name : '';
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    regularTotal : {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          let total = this.getDataValue('total');
          if(!total){
            return 0;
          }
          return UtilsService.moneyFormat(total);

        } catch(e){
          sails.log.error(e);
        }
      }
    },
    regularTax: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          let tax = this.getDataValue('tax');
          if(!tax){
            return 0;
          }
          return UtilsService.moneyFormat(tax);

        } catch(e){
          sails.log.error(e);
        }
      }
    },
    regularNoTaxTotal: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          let totalIncludeTax = this.getDataValue('totalIncludeTax');
          if(!totalIncludeTax){
            return 0;
          }
          return UtilsService.moneyFormat(totalIncludeTax);

        } catch(e){
          sails.log.error(e);
        }
      }
    },

    displayName: {
      type: Sequelize.STRING(65),
    },

  },
  associations: () => {
    // Order.hasOne(OrderStatus);
    Order.belongsTo(OrderStatus);

    Order.hasOne(OrderOption);
    Order.hasMany(OrderProduct);

    Order.hasMany(SupplierShipOrder);

    Order.belongsTo(Allpay);
    Order.belongsTo(User);

    Order.belongsTo(OrderPayment);
  },
  options: {
    paranoid: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {
      afterUpdate: async function(order, options) {
        let { transaction } = options;
        let orderChanged = order.changed();
        let logChanged = [];
        for(const key of orderChanged) {
          logChanged.push(`${key}: ${order[key]}`);
        }
        const orderHistory = await OrderHistory.create({
          notify: true,
          comment: `訂單 Order ID: ${order.id}，變更:${logChanged.join(',')}`,
          OrderId: order.id
        }, { transaction });
      }
    }
  }
};
