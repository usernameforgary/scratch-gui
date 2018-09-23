import fetch from 'cross-fetch'

const fetchPost = (url, postData = {}) => (
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
)

const fetchFile = (url) => (
  fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'get'
    }
  })
)

export {
  fetch as default,
  fetchPost,
  fetchFile,
}