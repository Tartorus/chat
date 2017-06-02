from django.db import models

class User(models.Model):
    """Модель пользователя"""

    login = models.CharField(max_length=50, null=False, unique=True)
    password = models.CharField(max_length=50, null=False)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField()
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True)


class Department(models.Model):
    """Подразделение пользователя"""
    name = models.CharField(max_length=100)


class Dialog(models.Model):
    """Модель диалогов"""


class DialogMember(models.Model):
    """Участники диалога"""

    creator = models.BooleanField(null=False, default=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE)

class Messages(models.Model):
    """Сообщения диалога"""

    text = models.TextField()
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
