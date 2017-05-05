from django.db import models


class User(models.Model):
    """Модель пользователя"""

    login = models.CharField(max_length=50, nullable=False, unique=True)
    password = models.CharField(max_length=50, nullable=False)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField()

class Dialog(models.Model):
    """Модель диалогов"""

    # creator = models.ForeignKey(User, on_delete=models.CASCADE)

class DialogMember(models.Model):
    """Участники диалога"""

    creator = models.BooleanField(nullable=False, default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
