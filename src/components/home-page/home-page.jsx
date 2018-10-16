import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import ConnectedIntlProvider from '../../lib/connected-intl-provider.jsx';
import {defineMessages, FormattedMessage, injectIntl, intlShape, InjectedIntl} from 'react-intl';
import kuDingLogo from '../menu-bar/kuding-logo.svg'
import { LINK_HOME_PAGE, LINK_CREATE_PROJECT, LINK_SHARED_PROJECTS } from '../../const/link-component'
import customStyles from './home-page.css'

import UserLoginInfo from '../../containers/user-login-info.jsx'
import UserLoginModal from '../../containers/user-login-modal.jsx'
import SnackBar from '../../containers/snack-bar.jsx'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
})

const ariaMessages = defineMessages({
  homePage: {
      id: 'custom.home.homePage',
      defaultMessage: 'Home',
  },
  createProject: {
      id: 'custom.home.createProject',
      defaultMessage: 'Create Project',
  },
})

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

class HomePageComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        {this.props.snackBar.open ? <SnackBar /> : null}
        <Grid item xs={12}>
          <AppBar position='sticky' style={{ backgroundColor: '#5696e3' }}>
            <ToolBar>
              <Typography>
                <img
                  alt="Scratch"
                  draggable={false}
                  src={kuDingLogo}
                  className={customStyles.scratchLogo}
                />
              </Typography>
              <Typography>
                <HomeIcon className={classes.icon} nativeColor="white" />
              </Typography> 
              <Typography variant="title" className={classes.root} style={{ backgroundColor: '#5696e3' }}>
                <Button component={LINK_HOME_PAGE}>
                  {this.props.intl.formatMessage(ariaMessages.homePage)}
                </Button>
                <Button component={LINK_CREATE_PROJECT}>
                  {this.props.intl.formatMessage(ariaMessages.createProject)}
                </Button>
              </Typography> 
              <UserLoginInfo />
              <UserLoginModal />
            </ToolBar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          {this.props.children}
        </Grid>
      </Grid>
    )
  }
}

HomePageComponent.propTypes = {
  snackBar: PropTypes.object.isRequired
}

export default withStyles(styles)(injectIntl(HomePageComponent))