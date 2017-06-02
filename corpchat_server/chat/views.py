from django.http import HttpResponse

def login(request):
    if request.method == 'POST':
        print("POST")
        print(request.POST.get('login'))
    return HttpResponse()
