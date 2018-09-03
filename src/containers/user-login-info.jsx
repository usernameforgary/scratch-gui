import bindAll from 'lodash.bindall'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
  user: state.scratchGui.userLoginInfo.userInfo
})

// const mapDispatchToProps = dispatch => ({
//   setLocales: (addedLocales) => dispatch(setLocales(addedLocales)),
// })

export default connect(
  mapStateToProps
)(UserLoginInfo)