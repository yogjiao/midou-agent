import React from 'react'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_LOGIN
} from 'macros.js'

import {getParentByClass} from 'util.js'
import {fetchable} from 'fetch.js'
import errors from 'errors.js'
let update = require('react-addons-update')


//password = md5(md5(password + 'lksdjflajM3(_$'))
let md5 = require('blueimp-md5')
//admin QGkoRLK#YaOsJoCwF,L[
import './Login.less'
class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };

  }
  thisHandler = (e) =>　{
    let target
    if (target = getParentByClass(e.target, 'btn-login')) {
      let account = this.refs.account.value
      let pwd = this.refs.pwd.value
      pwd = md5(md5(pwd + 'lksdjflajM3(_$'))
      let url = `${FETCH_LOGIN}/${account}/${pwd}`
      fetchable(url, {credentials: 'include'})
        .then((data) => {
          if (data.rea == 0) {
            alert('登录成功')
            setTimeout(() => {
              window.location.href = '/search'
            }, 1000)
          } else if (data.rea == 1000) {
            alert('账号或密码错误')
          }
        })
    }
  };
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };
  render() {
    return (
      <div className="login-container" onClick={this.thisHandler}>
        <div className="login-item">
          <span>账号:</span><input ref='account' placeholder="请输入账号" />
        </div>
        <div className="login-item">
          <span>密码:</span><input ref='pwd' placeholder="请输入密码" />
        </div>
        <div className="btn-login">login</div>
      </div>
    )
  }
}
// Home.childContextTypes = {
//     pageSpin: React.PropTypes.node.isRequired
//   }
// Home.contextTypes = {
//     name: React.PropTypes.string.isRequired,
//     //router: React.PropTypes.func.isRequired
// }
// Home.context = {
//   //pageSpin: pageSpin
// }
module.exports = Login
