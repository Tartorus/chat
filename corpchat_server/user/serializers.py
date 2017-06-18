from rest_framework import serializers
from .models import User, Department


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','login', 'name', 'surname', 'email', 'department')


class DepartmentSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'users')
