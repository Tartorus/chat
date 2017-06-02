function apiRequest(url, method, data=null) {
  if (data){
    var sendingData = new FormData();
    for (var key in data){
      sendingData.append(key, JSON.stringify(data[key]));
    }
  }
  return fetch('api/' + url, {method: method.toUpperCase(), body:sendingData})
}

export { apiRequest }
