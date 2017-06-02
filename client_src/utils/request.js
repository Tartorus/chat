function apiRequest(url, method, data=null) {
  if (!data){
    var sendingData = new FormData();
    sendingData.append('login', JSON.stringify(data));

  }
  return fetch('api/' + url, {method: method.toUpperCase(), body:sendingData})
}

export { apiRequest }
