from rest_framework import serializers
from .models import User, Department


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','login', 'name', 'surname', 'email', 'department', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class DepartmentSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ('id', 'name', 'users')
