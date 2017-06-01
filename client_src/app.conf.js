const SERVER_IP = '127.0.0.1'
const SERVER_PORT = '8000'
const API = 'http://' + SERVER_IP + ':' + SERVER_PORT

function apiRequest(url, method, data) {
  console.log(API + '/' + url);
  data = {1:2}
  fetch(API + '/' + url, {method: method.upperCase(), body:data})
}

export {SERVER_IP, SERVER_PORT, apis}
