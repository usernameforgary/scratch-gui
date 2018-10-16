import React from 'react'
import {connect} from 'react-redux'
import ProjectViewComponent from '../components/project-view/project-view.jsx'
import vmListenerHOC from '../lib/vm-listener-hoc.jsx'
import {
  updateProjectDescription,
  updateOperateDescription,
} from '../reducers/project-view'
import {
  updateUserProjectDescription
} from '../reducers/user-info'

class ProjectView extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    if (this.props.vm.initialized) {
    } else {
        this.props.vm.setCompatibilityMode(true);
        this.props.vm.start();
    }
  }

  render() {
    const {...props} = this.props
    return (
      <ProjectViewComponent {...props}/>
    )
  }
}

const mapStateToProps = state => ({
  currentLoginUser: state.scratchGui.userLoginInfo.userInfo,
  projectView: state.scratchGui.projectView,
  vm: state.scratchGui.vm
})

const mapDispatchToProps = dispatch => ({
  projectDescriptionUpdate: (description) => dispatch(updateProjectDescription(description)),
  projectOperateDescriptionUpdate: (description) => dispatch(updateOperateDescription(description)),
  descriptionUpdate: (currentViewProject) => dispatch(updateUserProjectDescription(currentViewProject))
})

const connectedProjectView = connect(mapStateToProps, mapDispatchToProps)(ProjectView)

export default vmListenerHOC(connectedProjectView)