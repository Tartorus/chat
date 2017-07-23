from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from hierarchy.managers import UserManager


class Department(models.Model):
    """Подразделение пользователя"""
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)





class User(AbstractBaseUser):
    """Модель пользователя"""

    login = models.CharField(max_length=50, null=False, unique=True)
    password = models.CharField(max_length=128, null=False)
    name = models.CharField(max_length=50, null=False, blank=False)
    surname = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(null=False, unique=True)
    department = models.ForeignKey(Department, null=False, related_name='users')
    objects = UserManager()

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['name', 'surname', 'email', 'department']

    def get_full_name(self):
        return '{} {}'.format(self.name, self.surname)

    def get_short_name(self):
        names = self.name.split(' ')
        shorts = ''
        for name in names:
            if name:
                result += name[0].upper + '.'
        return '{} {}'.format(result, self.surname)
