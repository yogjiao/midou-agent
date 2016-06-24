module.exports = {
  path: 'agent(/:agentId)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./AgentDetail.js'))
    })
  }
}
