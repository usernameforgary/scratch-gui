import React from 'react'
import PropTypes from 'prop-types'
import HomePage from '../../containers/home-page.jsx'
import { Link } from 'react-router-dom'
import { injectIntl, defineMessages } from 'react-intl'
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

import profileIcon from '../user-info/kuding.png'
import styles from './shared-projects.css'
import kuding_100 from '../../const/svgs/kuding_100.svg'
import iconEdit from '../../const/svgs/square-edit-outline.svg'
import iconDelete from '../../const/svgs/delete.svg'
import iconShare from '../../const/svgs/share.svg'

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

class SharedProjectsComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSharedProjects()
  }

  handleDeleteBtnClick(projectId) {
    this.props.handleUserProjectDelete(projectId)
  }

  handleShareBtnClick(projectId) {
    this.props.handleUserProjectShare(projectId)
  }

  handleEditBtnClick(project) {
    this.props.handleUserProjectEdit(project, this.props.vm)
  }

  handleCardClick(project) {
    this.props.handleViewProject(project, this.props.user._id, this.props.vm)
  }
  
  render() {
    const { classes } = this.props
    return (
      <HomePage>
        <Grid item xs={12}>
          <Grid container className={classes.root} spacing={24}>
            <Grid item xs={12} >
              <Grid style={{ marginBottom: 30}}>
                <Paper>
                  <Grid>
                    <Tabs
                      value={0}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      <Tab label='分享项目' />
                    </Tabs>
                  </Grid>
                </Paper>
              </Grid>
              <Grid container justify='center' spacing={24}>
                {this.props.sharedProjects ? this.props.sharedProjects.map(project => (
                  <Grid key={project._id} item>
                    <Card>
                      <CardActionArea onClick={() => this.handleCardClick(project)}>
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
                        <span>作者：{project.userId.username}</span>
                        {/* <IconButton onClick={() => this.handleEditBtnClick(project)}>
                          <img src={iconEdit} />
                        </IconButton>
                        <IconButton onClick={() => this.handleDeleteBtnClick(project._id)}>
                          <img src={iconDelete} />
                        </IconButton>
                        <IconButton onClick={() => this.handleShareBtnClick(project._id)}>
                          <img src={iconShare} />
                        </IconButton> */}
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

SharedProjectsComponent.propTypes = {
  handleUserProjectEdit: PropTypes.func.isRequired,
  vm: PropTypes.shape({
    loadProject: PropTypes.func
  }),
  handleViewProject: PropTypes.func.isRequired,
}

export default injectIntl(withStyles(stylesConst)(SharedProjectsComponent))