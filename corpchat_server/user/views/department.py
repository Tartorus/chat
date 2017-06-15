from rest_framework import generics
from user.models import Department
from user.serializers import DepartmentSerializer


class DepartmentList(generics.ListCreateAPIView):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
