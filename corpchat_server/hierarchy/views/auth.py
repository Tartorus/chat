import json
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.sessions.models import Session
from hierarchy.models import User
from hierarchy.serializers import UserSerializer


def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        username = data.get('login')
        password = data.get('password')
        print(request.user)
        user = auth.authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            auth.login(request, user)
            response = JsonResponse(UserSerializer(user).data)
        else:
            response = HttpResponse(status=404)
    else:
        response = HttpResponse(status=404)
    return response


def logout(request):
    response = HttpResponse()
    response.delete_cookie('session_id')
    response.delete_cookie('sessionid')
    Session.objects.filter(session_key=request.session.session_key).delete()
    return response
