import React from 'react'
import PropTypes from 'prop-types'
import HomePage from '../../containers/home-page.jsx'
import { Link } from 'react-router-dom'
import { injectIntl, defineMessages } from 'react-intl'
import ProjectLoader from '../../containers/project-loader.jsx'

import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

import { LINK_CREATE_PROJECT } from '../../const/link-component'

import profileIcon from '../user-info/kuding.png'
import styles from './user-projects.css'
import kuding_100 from '../../const/svgs/kuding_100.svg'
import iconEdit from '../../const/svgs/square-edit-outline.svg'
import iconDelete from '../../const/svgs/delete.svg'

const stylesConst = theme => {
  return {
    root: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
    },
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      width: 80,
      height: 80,
    },
    paperUserInfo: {
      padding: theme.spacing.unit * 1
    },
    userName: {
      padding: 10,
    },
    paperProject: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  }
}

const messages = defineMessages({
  createProject: {
    id: 'custom.home.createProject',
    defaultMessage: 'Create Project'
  },
  myProjects: {
    id: 'custom.user.userProject',
    defaultMessage: 'My Projects'
  },
  updateDate: {
    id: 'custom.common.updateDate',
    defaultMessage: 'Updated At: '
  }
})

class UserProjectsComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDeleteBtnClick(projectId) {
    this.props.handleUserProjectDelete(projectId)
  }

  handleEditBtnClick(project) {
    this.props.handleUserProjectEdit(project, this.props.vm)
  }

  render() {
    const { classes } = this.props
    return (
      <HomePage>
        <Grid item xs={12}>
          <Grid container className={classes.root} spacing={24}>
            <Grid item xs={3}>
              <Paper className={styles.paperUserInfo}>
                <Grid justify='center' alignItems='center' alignContent='center' container>
                  <Avatar
                    alt="Avatar"
                    src={this.props.user && this.props.user.userProfileIconUrl ? this.props.user.userProfileIconUrl : profileIcon}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                  />
                </Grid>
                <Grid justify='center' alignItems='center' alignContent='center' container>
                  <div className={classes.userName}><span>{this.props.user.username}</span></div>
                </Grid>
                <Grid justify='center' alignItems='center' alignContent='center' container>
                  <Button
                    color='primary' variant="contained"
                    component={LINK_CREATE_PROJECT}
                  >
                    {this.props.intl.formatMessage(messages.createProject)}
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={9} >
              <Grid style={{ marginBottom: 30}}>
                <Paper>
                  <Grid>
                    <Tabs
                      value={0}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      <Tab label={this.props.intl.formatMessage(messages.myProjects)} />
                    </Tabs>
                  </Grid>
                </Paper>
              </Grid>
              <Grid container justify='flex-start' spacing={16}>
                {this.props.user.projects ? this.props.user.projects.map(project => (
                  <Grid key={project._id} item>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="100"
                          image={project.projectIcon ? project.projectIcon : kuding_100}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="headline" component="h2">
                            {project.projectName ?
                              project.projectName :
                              project.projectUrl.substring(project.projectUrl.indexOf('_') + 1, project.projectUrl.lastIndexOf('.'))}
                          </Typography>
                          <Typography gutterBottom component="p">
                            {`${this.props.intl.formatMessage(messages.updateDate)}${project.updatedAt.split('T')[0]}`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Divider light />
                      <CardActions>
                        <IconButton onClick={() => this.handleEditBtnClick(project)}>
                          <img src={iconEdit} />
                        </IconButton>
                        <IconButton onClick={() => this.handleDeleteBtnClick(project._id)}>
                          <img src={iconDelete} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                )) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </HomePage>
    )
  }
}

UserProjectsComponent.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string,
    userProfileIconUrl: PropTypes.string
  }),
  handleUserProjectEdit: PropTypes.func.isRequired,
  vm: PropTypes.shape({
    loadProject: PropTypes.func
  })
}

export default injectIntl(withStyles(stylesConst)(UserProjectsComponent))