import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { defineMessages, injectIntl } from 'react-intl'
import { LINK_USER_PROJECTS } from '../../const/link-component'

import styles from './user-info.css'

import profileIcon from './kuding.png'
import dropdownCaret from '../language-selector/dropdown-caret.svg'

const messages = defineMessages({
  myProjects: {
    id: 'custom.user.userProject',
    defaultMessage: 'My Projects'
  },
  userSignOutLabel: {
    id: 'custom.login.signOutLabel',
    defaultMessage: 'Sign Out'
  }
})

class UserInfoComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null      
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose(event) {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state
    return (
        <div
            id="account-nav"
        >
            <div
                className={classNames(
                    styles.menuBarItem,
                    styles.hoverable,
                    styles.accountNavMenu
                )}
                onClick={this.handleClick}
            >
                <Avatar 
                    alt="Avatar" 
                    src={ this.props.user && this.props.user.userProfileIconUrl ? this.props.user.userProfileIconUrl : profileIcon}
                    className={classNames(styles.avatar, styles.bigAvatar)}
                />
                <span>
                    {this.props.user ? this.props.user.username : 'scratch-cat'}
                </span>
                <img
                    className={styles.dropdownCaretIcon}
                    src={dropdownCaret}
                />
            </div>
            {<Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                <MenuItem onClick={this.handleClose}>
                  <Button component={LINK_USER_PROJECTS}>
                    {this.props.intl.formatMessage(messages.myProjects)}
                  </Button>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Button onClick={this.props.handleUserSignOut}>
                    {this.props.intl.formatMessage(messages.userSignOutLabel)}
                  </Button>
                </MenuItem>
            </Menu>}
        </div>
    )
  }
}

UserInfoComponent.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        userProfileIconUrl: PropTypes.string
    }),
    handleUserSignOut: PropTypes.func.isRequired
}

export default injectIntl(UserInfoComponent)