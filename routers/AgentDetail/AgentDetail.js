import React from 'react'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  CREATION,
  UPDATING,
  BROWSE,
  AGENT_LEVEL,
  FETCH_ADD_AGENT,
  FETCH_AGENT,
  FETCH_DELETE_AGENT
} from 'macros.js'

import Uploader from 'Uploader/Uploader.js'
import Selection from 'Selection/Selection.js'
import Prompt from 'Prompt/Prompt.js'
import Confirm from 'Confirm/Confirm.js'
import {
  getParentByClass,
  pick,
  getCookie
} from 'util.js'
import {fetchable, fetchAuth} from 'fetch.js'
import errors from 'errors.js'

let update = require('react-addons-update')

import { MonthView  } from 'react-date-picker'
import 'react-date-picker/index.css'
import ProvinceSelection from 'ProvinceSelection/ProvinceSelection.js'
import provinces from 'provinces.js'

import './AgentDetail.less'
class AgentDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
    let now = new Date()
    this.state = {
      isAdmin: false,
      isCreation: false, //是否是创建agent
      actionState: CREATION,

      isHiddenUploader: true,
      isHiddenWxTextarea: true,
      isHiddenAgentSelection: true,
      isHiddenCalendar: true,
      isHiddenProvinceSelection: true,
      isHiddenSetMenu: true,
      isHiddenConfirm: true,

      uploadType: 0, //0: avatar 1: credit

      province: 1,
      province_name: '北京',
      city: 1,
      city_name: '北京',

      headimg: `${BASE_STATIC_DIR}/bg.jpg`,
      wx: '请设置微信号',
      //level: 1, //agent level
      levelIndex: 0,
      auth_date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,

      selectionType: 0, // 0 level selection 1
    };
    if (this.props.params.agentId) {
      this.state.actionState = BROWSE
    }

    if (getCookie('midouToken')) {
      this.state.isAdmin = true
    }
  };
  uploaderHandler = (data) => {
    let nextState = {isHiddenUploader: true}
    switch (this.state.uploadType) {
      case 0:
        nextState.headimg = data.img
        break;
      case 1:
        nextState.auth_letter = data.img
        break;
    }
    this.setState(nextState)
  };
  addressChangeHandler = (data) => {
    this.province = data.provinceId
    this.provinceName = data.provinceName
    this.city = data.cityId
    this.cityName = data.cityName
  };
  onDateChange = (date) => {
    this.setState({auth_date: date, isHiddenCalendar: true})
  };

  fetchAgent = (agentId) => {
    let url = `${FETCH_AGENT}/${agentId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == 0) {
          let agent = data.agent
          agent.levelIndex = AGENT_LEVEL.findIndex((item, index) => {
            return item.value == agent.level
          })
          this.setState(agent)
        } else if (data.rea == 6000) {


          setTimeout(() => {
            window.location.href = `${window.location.origin}/search`
          }, 3000)

          throw new Error(errors[data.rea])
        } else {
          throw new Error(errors[data.rea])
        }
      })
      .catch((error) => {
        this.setState({promptMsg: errors[error.rea] || error.message})
        this.refs.prompt.show()
      })
  };
  postAgent = () => {
    let data = pick(this.state, 'headimg', 'wx', 'province', 'city', 'auth_letter', 'auth_date')
    data.id = 7003
    data.level = AGENT_LEVEL[this.state.levelIndex].value
    fetchable(FETCH_ADD_AGENT, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == 0) {
          this.setState({promptMsg: '提交成功'})
          setTimeout(() => {
            window.location.href = `${window.location.origin}/agent/${data.wx}`
          }, 3000)
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }
      })
      .catch((error) => {
        this.setState({promptMsg: errors[error.rea] || error.message})
      })
      .then(() => {
        this.refs.prompt.show()
      })
  };
  deleteAgent = () => {
    let url =`${FETCH_DELETE_AGENT}/${this.props.params.agentId}`
    fetchable(url)
      .then((data) => {
        if (data.rea == 0) {
          this.setState({promptMsg: '删除成功'})
          setTimeout(() => {
            window.location.href = `${window.location.origin}/search`
          }, 3000)
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }
      })
      .catch((error) => {
        this.setState({promptMsg: errors[error.rea] || error.message})
      })
      .then(() => {
        this.refs.prompt.show()
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'switch-avatar')) {
      this.setState({isHiddenUploader: false, uploadType: 0})
    } else if (target = getParentByClass(e.target, 'close-uploader')) {
      this.setState({isHiddenUploader: true})
    } else if (target = getParentByClass(e.target, 'switch-wx')) {
      this.setState({isHiddenWxTextarea: false})
    } else if (target = getParentByClass(e.target, 'close-wx-setting')) {
      this.setState({isHiddenWxTextarea: true})
    } else if (target = getParentByClass(e.target, 'btn-wx-setting')) {
      let value = this.refs['wx-textarea'].value.trim()
      if (value) {
        this.setState({wx: value, isHiddenWxTextarea: true})
      } else {
        this.setState({isHiddenWxTextarea: true})
      }
    } else if (target = getParentByClass(e.target, 'switch-agent-level')) {
      this.setState({isHiddenAgentSelection: false})
    } else if (target = getParentByClass(e.target, 'select-item-wrap')) {
      if (!this.state.isHiddenAgentSelection) {
        let index = target.getAttribute('data-index')
        this.setState({levelIndex: index, isHiddenAgentSelection: true})
      }
    } else if(target = getParentByClass(e.target, 'switch-calendar')) {
      this.setState({isHiddenCalendar: false})
    } else if(target = getParentByClass(e.target, 'switch-province-slection')) {
      this.setState({isHiddenProvinceSelection: false})
    } else if (target = getParentByClass(e.target, 'btn-province-setting')) {
      let nextState = {isHiddenProvinceSelection: true}
      if (this.province) {
        nextState = Object.assign(nextState, {
          province: this.province,
          province_name: this.provinceName,
          city: this.city,
          city_name: this.cityName
        })
      }
      this.setState(nextState)
    } else if (target = getParentByClass(e.target, 'close-province-selection')) {
      this.setState({isHiddenProvinceSelection: true})
    } else if (target = getParentByClass(e.target, 'switch-credit')) {
      this.setState({isHiddenUploader: false, uploadType: 1})
    } else if (target = getParentByClass(e.target, 'post-agent')) {
      this.postAgent()
    } else if (target = getParentByClass(e.target, 'btn-set')) {
      this.setState({isHiddenSetMenu: false})
    } else if (target = getParentByClass(e.target, 'close-set-menu')) {
      this.setState({isHiddenSetMenu: true})
    } else if (target = getParentByClass(e.target, 'edit-agent')) {
      this.setState({actionState: UPDATING, isHiddenSetMenu: true})
    } else if (target = getParentByClass(e.target, 'delete-agent')) {
      this.setState({isHiddenConfirm: false, isHiddenSetMenu: true})
    }
  };
  deleteAgentHandler = () => {
    this.setState({isHiddenConfirm: true})
    this.deleteAgent()
  };
  componentDidMount = () => {
    if (this.state.actionState == BROWSE) {
      this.fetchAgent(this.props.params.agentId)
    }
  };
  componentWillUnmount = () => {
  };
  render() {
    let isShowArrowIcon = this.state.actionState != BROWSE && this.state.isAdmin
    return (
      <div className="agent-container" onClick={this.thisHandler}>
        <div className="agent-card">
          <div className="avatar-wraper">
            <div className="avatar" style={{backgroundImage: `url(${this.state.headimg})`}} />
            {
              isShowArrowIcon ?
                <i className="iconfont icon-gt switch-avatar" /> : ''
            }
          </div>
          <div>
            <div className="name-wraper">{this.state.wx}</div>
            {
              isShowArrowIcon ?
                <i className="iconfont icon-gt switch-wx" /> : ''
            }
          </div>
          <div>
            <dl className="info-wrap">
              <dt>代理级别:</dt>
              <dd>{AGENT_LEVEL[this.state.levelIndex].text}</dd>
            </dl>
            {
              isShowArrowIcon ?
                <i className="iconfont icon-gt switch-agent-level" /> : ''
            }
          </div>
          <div>
            <dl className="info-wrap">
              <dt>授权时间:</dt>
              <dd>{this.state.auth_date}</dd>
            </dl>
            {
              isShowArrowIcon ?
                <i className="iconfont icon-gt switch-calendar" /> : ''
            }
          </div>
          <div>
            <dl className="info-wrap">
              <dt>所在地区:</dt>
              <dd>{`${this.state.province_name}${this.state.city_name}`}</dd>
            </dl>
            {
              isShowArrowIcon ?
                <i className="iconfont icon-gt switch-province-slection" /> : ''
            }
          </div>
          <div className="credit-container">
            {
              this.state.auth_letter?
                (
                  <div className="credit-wraper">
                    <img src={`${this.state.auth_letter}`}></img>
                  </div>
                ) :
                (<p>请上传资质证书</p>)
            }

            {
              isShowArrowIcon  ?
                <i className="iconfont icon-gt switch-credit" /> : ''
            }
          </div>
          {
            this.state.isAdmin && this.state.actionState != CREATION?
              (<div className="iconfont icon-set btn-set" />) : ''
          }

          {
            this.state.isHiddenSetMenu ?
            '' :
            (
              <ul className="set-menu">
                <li className="edit-agent"><i className="iconfont icon-edit" /><span>编辑</span></li>
                <li className="delete-agent"><i className="iconfont icon-delete" /><span>删除</span></li>
                <i className="iconfont icon-close close-set-menu" />
              </ul>
            )
          }

        </div>
        {
          this.state.actionState != BROWSE ?
          (<div className="btn-sure post-agent">提交</div>) : ''
        }
        {
          this.state.isHiddenUploader ?
            '' : (<Uploader uploaderHandler={this.uploaderHandler}/>)
        }
        {
          this.state.isHiddenWxTextarea ?
            '' :
            (
              <div className="textarea-wraper">
                <textarea placeholder="请输入微信号" ref="wx-textarea"></textarea>
                <div className="btn-wraper">
                  <div className="btn-sure btn-wx-setting">确定</div>
                  <div className="btn-cancel close-wx-setting">取消</div>
                </div>
              </div>

            )
        }

        <Selection
          source={AGENT_LEVEL}
          selectionHandler={this.selectionHandler}
          itemType="1"
          title="分销商级别"
          selectedIndex={this.state.levelIndex}
          isHidden={this.state.isHiddenAgentSelection}
          ref="selection"
        />

        {
          this.state.isHiddenCalendar ?
          '' :
          <div className="calendar-wraper">
            <MonthView
              dateFormat="YYYY-MM-DD"
              date={this.state.auth_date}
              onChange={this.onDateChange}
            />
          </div>
        }
        {
          this.state.isHiddenProvinceSelection?
          '' :
          (
            <div className="province-wraper">
              <div className="adjust">
                <ProvinceSelection
                  source={provinces}
                  provinceId={this.state.province}
                  cityId={this.state.city}
                  onAddressChange={this.addressChangeHandler}
                />
                <div className="btn-wraper">
                  <div className="btn-sure btn-province-setting">确定</div>
                  <div className="btn-cancel close-province-selection">取消</div>
                </div>
              </div>
            </div>
          )
        }
        <Prompt msg={this.state.promptMsg} ref='prompt' />
        <Confirm
          isHidden={this.state.isHiddenConfirm}
          confirmHandler={this.deleteAgentHandler}
          cancelHandler={() => {
            this.setState({isHiddenConfirm: true})
          }}
        />
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
module.exports = AgentDetail
