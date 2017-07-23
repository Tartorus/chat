from rest_framework import serializers
from .models import Dialog, DialogMember


class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMember
        fields = "__all__"


class DialogSerializer(serializers.ModelSerializer):
    members = DialogMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Dialog
        fields = ("id", 'create_datetime', 'name', 'creator', 'members')
