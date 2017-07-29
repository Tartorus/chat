from django.db import models
from hierarchy.models import User


# TODO при удалении пользователя, каскадно удалятся диалоги, сообщения и т.д.

class Dialog(models.Model):
    """Модель диалогов"""

    create_datetime = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, null=True, blank=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.BooleanField(default=False, null=False)


class DialogMember(models.Model):
    """Участники диалога"""

    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='dialogs')
    active = models.BooleanField(default=True, null=False)

    class Meta:
        unique_together = ('dialog', 'user')

class Messages(models.Model):
    """Сообщения диалога"""

    text = models.TextField()
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE, related_name='messages')
    member = models.ForeignKey(DialogMember, on_delete=models.CASCADE, null=False)
    sending_time = models.DateTimeField(auto_now_add=True)
    reading_time = models.DateTimeField()


class InDialog(models.Model):
    """Отрезки нахождения пользователя в диалоге"""

    member = models.ForeignKey(DialogMember, on_delete=models.CASCADE, null=False)
    enter_time = models.DateTimeField(auto_now_add=True)
    exit_time = models.DateTimeField()
