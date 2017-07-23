from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, login, password, name, surname, email, department):
        user = self.model(
            login=login,
            password=password,
            name=name,
            surname=surname,
            email=email,
            department=department
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password, name, surname, email, department):
        return self.create_user(login, password, name, surname, email, department)
