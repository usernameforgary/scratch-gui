exports.getCookieValueByRegEx = (a, b) => {
  b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

exports.setCookies = (objects) => {
  for(var key in objects) {
    if (objects.hasOwnProperty(key)) {
      document.cookie = `${key}=${objects[key]}`
    }
  }
}

exports.removeCookies = (objects) => {
  for(var key in objects) {
    if (objects.hasOwnProperty(key)) {
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }
  }
}