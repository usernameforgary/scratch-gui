import editorMessages from 'scratch-l10n/locales/editor-msgs';

const CUSTOM_LOGIN_LOGIN_BUTTON = 'custom.login.loginButton'
const CUSTOM_LOGIN_LOGIN_TITLE = 'custom.login.loginTitle'

const customMessage = {
  'custom.login.loginButton': {
    'en': 'Login',
    'zh-cn': '登录'
  },
  'custom.projectName.inputPlaceholder': {
    'en': 'Please input project name',
    'zh-cn': '请输入项目名称'
  },
  [CUSTOM_LOGIN_LOGIN_TITLE]: {
    'en': 'Sign in/Sign up',
    'zh-cn': '登录/注册'
  },
  'custom.login.signInLabel': {
    'en': 'Sign In',
    'zh-cn': '登录'
  },
  'custom.login.signUpLabel': {
    'en': 'Sign Up',
    'zh-cn': '注册'
  },
  'custom.login.signOutLabel': {
    'en': 'Sign out',
    'zh-cn': '退出'
  },
  'custom.common.email': {
    'en': 'Email',
    'zh-cn': '邮箱'
  },
  'custom.common.password': {
    'en': 'Password',
    'zh-cn': '密码'
  },
  'custom.common.nickname': {
    'en': 'Nickname',
    'zh-cn': '昵称'
  },
  'custom.login.forgotPassword': {
    'en': 'Forgot your password?',
    'zh-cn': '忘记密码？'
  },
  'custom.gui.loader.savingProject': {
    'en': 'Saving Project...',
    'zh-cn': '保存项目...'
  },
  'custom.home.homePage': {
    'en': 'Home',
    'zh-cn': '主页'
  },
  'custom.home.createProject': {
    'en': 'Create Project',
    'zh-cn': '开始创作'
  },
  'custom.user.userProject': {
    'en': 'My Projects',
    'zh-cn': '我的作品'
  },
  'custom.common.updateDate': {
    'en': 'Updated At: ',
    'zh-cn': '最近更新：'
  },
  'custom.common.recordDeleteSuccess': {
    'en': 'Record delete successfully',
    'zh-cn': '记录删除成功'
  },
  'custom.common.recordDeleteFail': {
    'en': 'Record delete failed',
    'zh-cn': '记录删除失败'
  },
  'custom.project.saveSuccess': {
    'en': 'Save project successfully',
    'zh-cn': '项目保存成功'
  },
  'custom.project.saveFailed': {
    'en': 'Save project failed',
    'zh-cn': '项目保存失败'
  },
  'custom.common.operationError': {
    'en': 'Error occurred while do this operation',
    'zh-cn': '失败，执行此操作异常'
  }
}

const customEditorMessages = (customMessage => {
  for(const key in customMessage) {
    if(customMessage.hasOwnProperty(key)) {
      for(const innerKey in customMessage[key]) {
        if(customMessage[key].hasOwnProperty(innerKey)) {
          if(editorMessages.hasOwnProperty(innerKey)) {
            Object.assign(editorMessages[innerKey], {[key] : customMessage[key][innerKey]});
          } else {
            editorMessages[innerKey] = {[key] : customMessage[key][innerKey]}; 
          }
        }
      }
    }
  }
  return editorMessages;
})(customMessage)

export {
  customEditorMessages as default,
  CUSTOM_LOGIN_LOGIN_BUTTON,
  CUSTOM_LOGIN_LOGIN_TITLE,
}