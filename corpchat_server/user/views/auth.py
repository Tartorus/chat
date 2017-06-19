import json
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.sessions.models import Session
from user.models import User
from user.serializers import UserSerializer


def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        username = data.get('login')
        password = data.get('password')
        print(request.user)
        user = auth.authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            print('LOGIN')
            response = JsonResponse(UserSerializer(user).data)
        else:
            response = HttpResponse(status=404)
    else:
        response = HttpResponse(status=404)
    return response

# def login(request):
#     response = HttpResponse()
#     if request.method == 'POST':
#         data = json.loads(request.body.decode())
#         if not data.get('password') or not data.get('login'):
#             response.status_code = 401
#         else:
#             user = User.objects.get(login=data['login'])
#             if data['password'] != user.password:
#                 response.status_code = 401
#             else:
#                 if not request.session.exists(request.session.session_key):
#                     request.session.create()
#                 # TODO устанавливаются 2 куки session_id и sessionid.
#                 # Если записывать куку с ключем  sessionid, то приходится логинится
#                 # несколько раз
#                 response = JsonResponse(UserSerializer(user).data)
#                 response.set_cookie('session_id', request.session.session_key)
#     else:
#         response = 404
#     return response


def logout(request):
    response = HttpResponse()
    response.delete_cookie('session_id')
    response.delete_cookie('sessionid')
    Session.objects.filter(session_key=request.session.session_key).delete()
    return response
