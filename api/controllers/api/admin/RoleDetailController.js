module.exports = {

  find: async (req, res) => {
    try {
      const { query, method, body } = req;
      const { serverSidePaging } = query;
      const modelName = req.options.controller.split("/").reverse()[0];
      const include = [  ];
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
      const item = await RoleDetail.findOne({
        where:{
          id
        },
        include: []
      });
      res.ok({data: {item}});
    } catch (e) {
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;
      let checkRoleDetailHaveREADName = await RoleDetailService.checkRoleDetailHaveREADName({ data });
      const checkHaveSameRole = await RoleDetailService.checkHaveSameRole({ data });
      checkRoleDetailHaveREADName = (data.api === '' && checkRoleDetailHaveREADName) || data.api !== '' || data.name === 'READ' || data.name === 'READ_WRITE';
      const checkSuccess = checkRoleDetailHaveREADName && !checkHaveSameRole;
      if(checkSuccess) {
        const item = await RoleDetail.create(data);
        let message = 'Create success.';
        res.ok({ message, data: { item } } );
      } else {
        if(checkHaveSameRole) {
          throw Error('此權限已存在!');
        } else {
          throw Error('需要先有 READ 權限才能建立此權限!');
        }
      }
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id, MenuItemId } = req.params;
      const data = req.body;
      const findMenuItemId = await MenuItem.findOne({ where: { id: data.MenuItemId } });
      const loinUser = AuthService.getSessionUser(req).username;
      const message = 'Update success.';
      let checkRoleDetailHaveREADName = await RoleDetailService.checkRoleDetailHaveREADName({ data });
      const checkHaveSameRole = await RoleDetailService.checkHaveSameRole({ data });
      if(!checkRoleDetailHaveREADName) {
        checkRoleDetailHaveREADName = false;
      } else {
        if(data.name === 'READ' || data.name === 'READ_WRITE') {
          checkRoleDetailHaveREADName = false;
        } else {
          checkRoleDetailHaveREADName = true;
        }
      }
      const checkAdminUpdateRolePage = (findMenuItemId.dataValues.title === '詳細權限' || findMenuItemId.dataValues.title === '權限') && loinUser === 'admin';
      const checkSuccess = checkRoleDetailHaveREADName && !checkHaveSameRole && !checkAdminUpdateRolePage;
      if(checkSuccess) {
        const item = await RoleDetail.update(data ,{
          where: { id, },
        });
        res.ok({ message, data: { item } });
      } else {
        if(checkHaveSameRole) {
          throw Error('此權限已存在!');
        } else if(checkAdminUpdateRolePage) {
          throw Error("無法調整此權限！  調整後將會造成此頁無法進入！");
        } else {
          throw Error('需要先有 READ 權限才能更新此權限!');
        }
      }
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const MenuItemId = await  RoleDetail.findOne({ where: { id } });
      const findMenuItemId = await MenuItem.findOne({ where: { id: MenuItemId.dataValues.MenuItemId } });
      const loinUser = AuthService.getSessionUser(req).username;
      const checkAdminUpdateRolePage = (findMenuItemId.dataValues.title === '詳細權限' || findMenuItemId.dataValues.title === '權限') && loinUser === 'admin';
      if(checkAdminUpdateRolePage) {
        throw Error("無法刪除此權限！  刪除後將會造成此頁無法進入！");
      } else {
        const item = await RoleDetail.destroy({ where: { id } });
        let message = 'Delete success';
        res.ok({message, data: {item}});
      }
    } catch (e) {
      res.serverError(e);
    }
  }
}
