function apiRequest(url, method, data=null, params=null) {
  var sendingData = null;

  console.log(data);
  if (data){
    sendingData = JSON.stringify(data);
  }

  var headers = new Headers();
  url = 'api/' + url
  if (params != null || params != undefined){
      url += toQueryString(params)
  }
  headers.append("Content-Type", "application/json");
  return fetch(
    url,
   {
     method: method.toUpperCase(),
     body:sendingData,
     credentials: "same-origin",
     headers:headers
   }
 )
}


function toQueryString(qObject) {
  var result = '?';
  for (var key in qObject){
    // if (typeof key == 'string'){
    //   throw 'key ' + key + ' not string'
    // }
    result += key + '=' + qObject[key] + '&'
  };
  return result.slice(0, -1)   
}


var appUrls = {
  user: 'hierarchy/user',
  userLogin: 'hierarchy/user/login',
  userLogout: 'hierarchy/user/logout',
  departmentList: 'hierarchy/department',
  dialogList: 'chat/dialog'
}

export { apiRequest, appUrls }
