from rest_framework import serializers
from .models import Dialog, DialogMember, Messages


class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMember
        fields = "__all__"


class DialogMemberSerializer(serializers.ModelSerializer):
    members = DialogMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Dialog
        fields = ("id", 'create_datetime', 'name', 'creator', 'group', 'members')


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'


class DialogMessagesSerializer(serializers.ModelSerializer):
    messages = MessagesSerializer(many=True, read_only=True)

    class Meta:
        model = Dialog
        fields = ("id", 'create_datetime', 'name', 'creator', 'messages')
