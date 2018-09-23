import bindAll from 'lodash.bindall'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { projectName } from '../reducers/menus'
import { userSaveProject } from '../reducers/user-info'
import ProjectShareComponent from '../components/project-share/project-share.jsx'

class ProjectShare extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      ...props
    } = this.props
    return (
      <ProjectShareComponent {...props}/>
    ) 
  }
}

const mapStateToProps = state => ({
  projectName: projectName(state),
  vm: state.scratchGui.vm,
  isUserLogin: state.scratchGui.userLoginInfo.isUserLogin,
  userId: state.scratchGui.userLoginInfo.userInfo._id,
})

const mapDispatchToProps = dispatch => ({
  shareProject: (isUserLogin, projectName, userId, vm) => dispatch(userSaveProject(isUserLogin, projectName, userId, vm))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(ProjectShare);