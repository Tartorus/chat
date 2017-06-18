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
