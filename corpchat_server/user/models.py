from django.db import models

class User(models.Model):
    """Модель пользователя"""

    login = models.CharField(max_length=50, null=False, unique=True)
    password = models.CharField(max_length=50, null=False)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField(null=False, unique=True)
    department = models.ForeignKey('Department', null=False, related_name='users')


class Department(models.Model):
    """Подразделение пользователя"""
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
