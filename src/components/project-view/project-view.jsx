import React from 'react'
import HomePage from '../../containers/home-page.jsx'
import { Grid, Paper, withStyles, TextField, Button} from '@material-ui/core'
import StageWrapper from '../../containers/stage-wrapper.jsx'
import {resolveStageSize} from '../../lib/screen-utils'
import Renderer from 'scratch-render'

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
    },
    textField: {
      //marginLeft: theme.spacing.unit,
      //marginRight: theme.spacing.unit,
    },
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      width: 80,
      height: 80,
    },
    paperProject: {
      height: 'calc(100%)',
      width: 'calc(100%)',
      padding: theme.spacing.unit * 1
    }
  }
}

let isRendererSupported = null;
//TODO
//const stageSize = resolveStageSize(stageSizeMode, isFullSize);

class ProjectViewComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDescriptionChange(e) {
    const { target: {name, value}} = e
    this.props.projectDescriptionUpdate(value)
  }

  handleDescriptionOperate(e) {
    const { target: {name, value}} = e
    this.props.projectOperateDescriptionUpdate(value)
  }

  handleSaveBtnClick(e) {
    this.props.descriptionUpdate(this.props.projectView.currentViewProject)
  }

  render() {
    const { classes } = this.props
    if (isRendererSupported === null) {
      isRendererSupported = Renderer.isSupported()
    }
    
    //TODO with this judgement because of the userId field in shared projects and user projects are not with same structure
    // shared projects userId: { _id: 'xxxx', username: 'xxx'}
    // user projects userId: 'xxxxxx'
    const isMyProject = 
      this.props.projectView.currentViewProject.userId === this.props.currentLoginUser._id ||
      this.props.projectView.currentViewProject.userId._id === this.props.currentLoginUser._id 

    return (
      <HomePage>
        <Grid item xs={12}>
          <Paper className={classes.paperProject}>
            <Grid container className={classes.root} spacing={24}>
              <Grid item xs={6}>
                <StageWrapper
                  isRendererSupported={isRendererSupported}
                  stageSize= {'large'}
                  vm={this.props.vm}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container direction='column' justify='flex-start' spacing={24}>
                  <Grid item>
                    <Grid container justify='center'>
                      <div>{this.props.projectView.currentViewProject.projectName}</div>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      onChange={e => this.handleDescriptionChange(e)}
                      fullWidth
                      id="outlined-multiline-static"
                      label="作品介绍"
                      multiline
                      rows="4"
                      defaultValue={this.props.projectView.currentViewProject.project_description}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      disabled={isMyProject ? false : true}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      onChange={e => this.handleDescriptionOperate(e)}
                      label="操作说明"
                      multiline
                      rows="4"
                      defaultValue={this.props.projectView.currentViewProject.operation_description}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      disabled={isMyProject ? false : true}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      onClick={e => this.handleSaveBtnClick(e)}
                      color='primary'
                      fullWidth
                      size='large'
                      variant='outlined'
                      disabled={isMyProject ? false : true}
                    >
                      保存
                    </Button>
                  </Grid>
                </Grid>
              </Grid> 
            </Grid>
          </Paper>
        </Grid>
      </HomePage>
    )
  }
}

export default withStyles(styles)(ProjectViewComponent)