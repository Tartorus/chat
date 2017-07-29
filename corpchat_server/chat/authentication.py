from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuth(SessionAuthentication):

    def enforce_csrf(self, request):
        return
