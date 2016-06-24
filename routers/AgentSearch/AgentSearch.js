import React from 'react'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_AGENT,
  AGENT_LEVEL
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
let update = require('react-addons-update')
import errors from 'errors.js'
import Prompt from 'Prompt/Prompt.js'
import {getParentByClass} from 'util.js'


import './AgentSearch.less'
class AgentSearch extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isHiddenPrompt: true
    };

  }
  fetchAgent = (agentId) => {
    let url = `${FETCH_AGENT}/${agentId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == 0) {
          window.location.href = `${window.location.origin}/agent/${data.agent.wx}`
        } else if (data.rea == 6000) {
          throw new Error(`<div class='prompt-format'>没有查到代理商:<p>${agentId}</p></div>`)
        } else {
          throw new Error(errors[error.rea])
        }
      })
      .catch((error) => {
        this.setState({promptMsg: errors[error.rea] || error.message})
        this.refs.prompt.show()
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'btn-search')) {
      let value = this.refs['txt-search'].value
      this.fetchAgent(value)
    }
  };
  keyPressHandler = (e) => {
    if (e.which == 13) {
      let value = this.refs['txt-search'].value
      this.fetchAgent(value)
    }
  };
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };
  render() {
    return (
      <div className="agent-search-container" onClick={this.thisHandler}>
        <div className="logo-wrap"></div>
        <div className="search-wraper">
          <input placeholder="请输入微信号, 回车开始搜索" ref='txt-search' onKeyPress={this.keyPressHandler}/>
          <div className="btn-search">搜索</div>
        </div>
        <Prompt msg={this.state.promptMsg} ref="prompt" />
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
module.exports = AgentSearch
