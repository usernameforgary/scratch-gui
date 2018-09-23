import bindAll from 'lodash.bindall'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { handleUserSignOut } from '../reducers/user-info.js'
import UserInfoComponent from "../components/user-info/user-info.jsx"
import UserLogin from "./user-login.jsx"

class UserLoginInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      ...props
    } = this.props
    return (
      this.props.isUserLogin ?  <UserInfoComponent {...props}/> : <UserLogin />
    )
  }
}

UserLoginInfo.propTypes = {
  isUserLogin: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isUserLogin: state.scratchGui.userLoginInfo.isUserLogin,
  user: state.scratchGui.userLoginInfo.userInfo,
})

const mapDispatchToProps = dispatch => ({
  handleUserSignOut: () => dispatch(handleUserSignOut()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLoginInfo)