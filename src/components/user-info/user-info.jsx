import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import styles from './user-info.css'

import profileIcon from './icon--profile.png'
import dropdownCaret from '../language-selector/dropdown-caret.svg'

class UserInfoComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div
            id="account-nav"
            place="left"
        >
            <div
                className={classNames(
                    styles.menuBarItem,
                    styles.hoverable,
                    styles.accountNavMenu
                )}
            >
                <img
                    className={styles.profileIcon}
                    src={ this.props.user && this.props.user.userProfileIconUrl ? this.props.user.userProfileIconUrl : profileIcon}
                />
                <span>
                    {this.props.user ? this.props.user.userName : 'scratch-cat'}
                </span>
                <img
                    className={styles.dropdownCaretIcon}
                    src={dropdownCaret}
                />
            </div>
        </div>
    )
  }
}

UserInfoComponent.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.string,
        userName: PropTypes.string,
        userProfileIconUrl: PropTypes.string
    })
}

export {
    UserInfoComponent as default
} 