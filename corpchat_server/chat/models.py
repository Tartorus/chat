from django.db import models
from user.models import User


class Dialog(models.Model):
    """Модель диалогов"""


class DialogMember(models.Model):
    """Участники диалога"""

    creator = models.BooleanField(null=False, default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Messages(models.Model):
    """Сообщения диалога"""

    text = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
