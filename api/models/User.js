import moment from 'moment';
module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      set: function(val) {
        this.setDataValue('firstName', val)
        this.setDataValue('displayName', val);
      }
    },
    lastName: {
      type: Sequelize.STRING,
      set: function(val) {
        this.setDataValue('lastName', val);
        let myDisplayName = this.getDataValue('displayName');
        const user = this.getDataValue('User');
        const isTw = user && user.locale === 'zh_TW';

        var regExp = /^[\d|a-zA-Z| ]+$/;
        var checkEng = regExp.test(myDisplayName);
        if (!checkEng) {
          myDisplayName = val + myDisplayName;
        } else if(isTw) {
          myDisplayName = val + myDisplayName;
        }
        this.setDataValue('displayName', myDisplayName);
      }
    },
    birthday:{
      type: Sequelize.DATE,
      get: function() {
        try {
          let birthday = this.getDataValue('birthday');

          if (!birthday) {
            return null;
          }

          return moment(new Date(birthday)).format("YYYY/MM/DD");

        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    phone1:{
      type: Sequelize.STRING
    },
    phone2:{
      type: Sequelize.STRING
    },
    address:{
      type: Sequelize.STRING
    },
    address2:{
      type: Sequelize.STRING
    },
    postCode: {
      type: Sequelize.STRING(10)
    },
    city: {
      type: Sequelize.STRING(128)
    },
    district: {
      type: Sequelize.STRING(128)
    },
    locale: {
      type: Sequelize.STRING,
      defaultValues: 'zh_TW'
    },
    displayName: {
      type: Sequelize.STRING(65),
      set: function(val) {
        if(_.isNil(val)) {
          if (this.getDataValue('username') === ''){
            const displayName = this.getDataValue('email');
          } else {
            const displayName = this.getDataValue('username');
          }
          this.setDataValue('displayName', displayName);
        }
      }
    },
    rolesArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisRoles = this.getDataValue('Roles');
          const roles = thisRoles ? thisRoles.map((role) => role.authority) : [];
          return roles;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    userAgent: {
      type: Sequelize.STRING,
    },
    lastLogin: {
      type: Sequelize.DATE,
      get: function () {
        try {
          let lastLogin = this.getDataValue("lastLogin");

          if (!lastLogin) {
            return lastLogin;
          }

          return moment(new Date(lastLogin)).format("YYYY/MM/DD HH:mm:SS");
        }
        catch (e) {
          throw e;
        }
      }
    },
    lastLoginIP: {
      type: Sequelize.STRING,
    },
    lastLoginLat: {
      type: Sequelize.DOUBLE,
    },
    lastLoginLng: {
      type: Sequelize.DOUBLE,
    },
    facebookId: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue: '/assets/admin/img/avatars/default.png'
    },
    avatarThumb: {
      type: Sequelize.STRING,
      defaultValue: '/assets/admin/img/avatars/default.png'
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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

    resetPasswordToken: {
      type: Sequelize.STRING(32),
    },

    verificationEmailToken: {
      type: Sequelize.STRING(32),
    },

  },
  associations: function() {
    User.hasMany(Image, {
      foreignKey: {
        name: 'UserId'
      }
    });
    User.hasMany(Post, {
      foreignKey: {
        name: 'UserId'
      }
    });
    User.hasMany(Passport, {
      foreignKey: {
        name: 'UserId'
      }
    });

    User.belongsToMany(Role, {
      through: 'UserRole',
      foreignKey: {
        name: 'UserId',
        as: 'Roles'
      }
    });

    Role.belongsToMany(User, {
      through: 'UserRole',
      foreignKey: {
        name: 'RoleId',
        as: 'Users'
      }
    });

    User.belongsTo(Supplier);


  },
  options: {
    paranoid: true,
    // tableName: 'Users',
    classMethods: {
      findOneWithPassport: async function({id}) {
        sails.log.info("findOneWithPassport id=>", id);
        return await User.findOne({
          where: {
            id
          },
          include: [ Supplier, Role, {
              model: Passport,
              where: { provider: 'local' },
              required: false
          }],
          paranoid: false,
        });
      },
      deleteById: async (id) => {
        try {
          return await User.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {
      loginSuccess: async function({ userAgent }) {
        const now = new Date();
        this.userAgent = userAgent;
        this.lastLogin = now.getTime();
        await this.save();
      }
    },
    hooks: {
      afterCreate: async function(user, options) {
        let {transaction} = options;
        // console.log("=== transaction ===", transaction);
        // transaction = null;
        const userRole = await Role.findOne({where: {authority: 'user'}});
        await user.addRole(userRole, {transaction});
      }
    }
  }
};
