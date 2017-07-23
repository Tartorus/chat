function apiRequest(url, method, data=null) {
  var sendingData = null;

  if (data){
    sendingData = JSON.stringify(data);
  }

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  return fetch(
    'api/' + url,
   {
     method: method.toUpperCase(),
     body:sendingData,
     credentials: "same-origin",
     headers:headers
   }
 )
}

var appUrls = {
  user: 'hierarchy/user',
  userLogin: 'hierarchy/user/login',
  userLogout: 'hierarchy/user/logout',
  departmentList: 'hierarchy/department/'
}

export { apiRequest, appUrls }
