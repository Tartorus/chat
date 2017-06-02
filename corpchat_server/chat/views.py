from django.http import HttpResponse

def login(request):
    response = HttpResponse()
    if request.method == 'POST':
        data = request.POST
        if not data.get('password') or not data.get('login'):
            response.status_code = 401
        print(data)
    else:
        response = 404
    return response
