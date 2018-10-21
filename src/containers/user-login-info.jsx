import bindAll from 'lodash.bindall'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCookieValueByRegEx, setCookies } from '../lib/cookie-util'

import { handleUserSignOut, userCookieLogin} from '../reducers/user-info.js'
import UserInfoComponent from "../components/user-info/user-info.jsx"
import UserLogin from "./user-login.jsx"

class UserLoginInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const s_id = getCookieValueByRegEx('s_id')
    const name = getCookieValueByRegEx('username')
    const account = getCookieValueByRegEx('account')
    const head_img = getCookieValueByRegEx('head_img')
    if(!this.props.isUserLogin && s_id) {
      this.props.userCookieLogin(s_id, name, account, head_img)
    }
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
  userCookieLogin: (s_id, username, account, head_img) => dispatch(userCookieLogin(s_id, username, account, head_img))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLoginInfo)