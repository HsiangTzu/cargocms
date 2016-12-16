import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import Login from 'views/Login/Login'
import MaterialUi from 'views/MaterialUi/MaterialUi'

export default (store) => (
  <Route path='/'>
    <Route path="/ship/login" component={Login} />
    <Route path='/ship' component={CoreLayout}>
      <IndexRoute component={HomeView} />
      <Route path="index" component={HomeView} />
      <Route path='MaterialUi' component={MaterialUi} />    <IndexRoute component={HomeView} />
    </Route>
  </Route>
)

//
// export default (store) => (
//   <Route path='/ship' component={CoreLayout}>