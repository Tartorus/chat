from django.http import HttpResponse
from chat.models import User

def login(request):
    response = HttpResponse()
    if request.method == 'POST':
        data = request.POST
        if not data.get('password') or not data.get('login'):
            response.status_code = 401
        else:
            print(data['login'])
            user = User.objects.get(login=data['login'])
            if data['password'] != user.password:
                response.status_code = 401
    else:
        response = 404
    return response

def userRegistration(request):
    """Регистрация пользователя"""
    response = HttpResponse()
    if request.method == 'POST':
        data = request.POST
        if not all([data.get('login'), data.get('password'), data.get('email')]):
            response.status_code = 400
        else:
            User(
                login=data['login'],
                password=data['password'],
                name=data.get('name'),
                surname=data.get('surname'),
                email=data['email'],
                # department=data.get('department')
             ).save()
    else:
        response.status_code = 404
    return response
