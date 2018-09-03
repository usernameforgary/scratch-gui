import React from 'react'
import { connect } from 'react-redux'

import UserLoginComponent from '../components/user-login/user-login.jsx'
import {toggleLoginModal, userLogin} from '../reducers/user-info.js'

class UserLogin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      ...props
    } = this.props
    return (
      <UserLoginComponent {...props}/>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  toggleLoginModal: () => dispatch(toggleLoginModal())
})

export default connect(null, mapDispatchToProps)(UserLogin) 