import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Lang from 'lodash';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import Login from 'views/Login/Login';
import MaterialUi from 'views/MaterialUi/MaterialUi';
import ShipList from 'views/ShipListView';
import ShipNewList from 'views/ShipNewListView';
import ShipProcessingList from 'views/ShipProcessingListView';
import ShippedList from 'views/ShippedListView';
import ShipCompletedList from 'views/ShipCompletedListView';

function redirectToLogin(props, replace) {
  // TODO: 有登入 api 之後需要啟用這隻 func 以便在進去後台前就先檢查是否已登入
  // if (Lang.isUndefined(props.user) || Lang.isEmpty(props.user.currentUser)) {
  //   console.error('please login.');
  //   replace({
  //     pathname: '/ship/login',
  //   });
  // }
}

export default (store) => (
  <Route path='/'>
    <IndexRoute component={Login} />
    <Route path='/ship/login' component={Login} />
    <Route path='/ship' component={CoreLayout} onEnter={redirectToLogin}>
      <IndexRoute component={ShipNewList} />
      <Route path='/ship/history' component={ShipList} />
      <Route path='/ship/new' component={ShipNewList} />
      <Route path='/ship/processing' component={ShipProcessingList} />
      <Route path='/ship/shipped' component={ShippedList} />
      <Route path='/ship/completed' component={ShipCompletedList} />
      {/* <Route path='/ship/user' component={ShipList} /> */}
      {/* <Route path='/contact' component={Login} /> */}
    </Route>
    {/* <Route path='/HomeView' component={CoreLayout}>
      <IndexRoute component={HomeView} />
    </Route> */}
  </Route>
);
