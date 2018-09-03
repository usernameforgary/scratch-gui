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

export {
  fetchPost
}