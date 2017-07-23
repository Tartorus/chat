import json
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.sessions.models import Session
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Dialog
from .serializers import DialogSerializer


class DialogList(APIView):
    """Список диалогов пользователя"""

    def get(self, request, format=None):
        dialogs = Dialog.objects.filter(dialogmember__user_id = request.user.id).all()
        return Response(DialogSerializer(dialogs, many=True).data)
