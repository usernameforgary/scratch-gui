import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import WarningIcon from "@material-ui/icons/Warning"
import { withStyles } from "@material-ui/core/styles"
import {injectIntl} from 'react-intl'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }
  
  handleClose(event, reason) {
    this.props.handleSnackBarClose() 
  };

  render() {
    const { classes, open, variant, message, vertical, horizontal, autoHideDuration } = this.props;
    const Icon = variantIcon[variant];
    
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: vertical,
            horizontal: horizontal
          }}
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classNames(classes[variant], classes.margin)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                {this.props.intl.formatMessage(message)}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  vertical: PropTypes.string.isRequired,
  horizontal: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  handleSnackBarClose: PropTypes.func.isRequired
};

export default injectIntl(withStyles(styles)(CustomizedSnackbars))
