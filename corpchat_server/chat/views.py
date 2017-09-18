import json
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.sessions.models import Session
from rest_framework.views import APIView
from rest_framework import generics, permissions, authentication
from rest_framework.response import Response
from hierarchy.models import User
from .authentication import CsrfExemptSessionAuth
from .models import Dialog, Messages, DialogMember
from .serializers import DialogMemberSerializer, DialogMessagesSerializer, MessagesSerializer


class DialogList(APIView):
    """Список диалогов пользователя"""

    authentication_classes = (CsrfExemptSessionAuth,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        dialogs = Dialog.objects.filter(members__user_id = request.user.id).all()
        return Response(DialogMemberSerializer(dialogs, many=True).data)

    def post(self, request, format=None):
        data = json.loads(request.body.decode())
        users = data.get('users')
        if users:
            group = False if len(users) == 1 else True
            users = User.objects.filter(id__in=users).all()
            dialog_name = ' '.join([request.user.get_full_name()] + [u.get_full_name() for u in users])
            if group:
                # Создание конференции
                print('GROUP')
            else:
                print('DIALOG')
                print(Dialog.objects.filter(group=False).exists())

            dialog = Dialog(creator=request.user, name=dialog_name, group=group)
            dialog.save()
            DialogMember(dialog=dialog, user=request.user).save()
            for u in users:
                DialogMember(dialog=dialog, user=u).save()


        dialogs = Dialog.objects.filter(members__user_id = request.user.id).all()
        return Response(DialogMemberSerializer(dialogs, many=True).data)


class DialogDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Dialog.objects.all()
    serializer_class = DialogMessagesSerializer


# class MessageList(APIView):
#     """Список сообщний по диалогу"""
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def get(self, request, dialog_id, format=None):
#         queryset = Messages.objects.filter(dialog_id = dialog_id).all()
#         return Response(MessagesSerializer(queryset, many=True).data)
