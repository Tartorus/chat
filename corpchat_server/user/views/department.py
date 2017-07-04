from rest_framework import generics, permissions, authentication
from user.models import Department
from user.serializers import DepartmentSerializer


class DepartmentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (authentication.BasicAuthentication, authentication.SessionAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
