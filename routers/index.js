import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import {BASE_PAGE_DIR, BASE_ROUTER_DIR} from 'macros.js'

//React.initializeTouchEvents(true);
//import ocBridge from './components/WebViewJavascriptBridge.js'

//pollyfill
import 'polyfill.js'
import 'es6-promise'
import 'whatwg-fetch'

//enhance
import fastclick  from 'fastclick'

//init
new fastclick(document.body);

import '../less/index.less'
import App from './App/App.js'

const rootRoute = {
  component: App,
  childRoutes: [ {//createElement
    //https://github.com/reactjs/react-router/blob/master/docs/guides/RouteMatching.md
    path: `${BASE_ROUTER_DIR}`,//`${BASE_PAGE_DIR}/scene/:sceneId`,
    //component: require('../routers/Home'),
    //component: require('./App/App.js'),
    //indexRoute: { component: Home },//require('./Home/Home.js')
    childRoutes: [
      require('./AgentSearch'),
      require('./AgentDetail'),
      require('./Login'),

    ]
  } ],
  onLeave: function(params, replace) {
  },
  onEnter: function(nextProps, replace) {
  }
}
render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
