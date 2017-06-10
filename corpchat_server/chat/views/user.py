import json
from django.http import HttpResponse
from rest_framework import generics
from chat.models import User
from chat.serializers import UserSerializer


class UserList(generics.ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

# def UserList(request):
#     """Регистрация пользователя"""
#     response = HttpResponse()
#     if request.method == 'POST':
#         data = json.loads(request.body.decode())
#         if not all([data.get('login'), data.get('password'), data.get('email')]):
#             response.status_code = 400
#         else:
#             if User.objects.filter(login=data['login']).exists():
#                 # TODO возвращать собщение об ошибке
#                 response.status_code = 409
#             if User.objects.filter(email=data['email']).exists():
#                 # TODO возвращать собщение об ошибке
#                 response.status_code = 409
#             else:
#                 User(
#                     login=data['login'],
#                     password=data['password'],
#                     name=data.get('name'),
#                     surname=data.get('surname'),
#                     email=data['email'],
#                     # department=data.get('department')
#                  ).save()
#     else:
#         response.status_code = 404
#     return response
