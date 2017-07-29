from rest_framework import generics, permissions, authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from hierarchy.models import Department
from hierarchy.serializers import DepartmentSerializer


# class DepartmentList(generics.ListCreateAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializer


class DepartmentList(APIView):

    def get(self, request, format=None):
        departments = Department.objects.all()
        data = DepartmentSerializer(departments, many=True).data
        if request.query_params.get('user'):
            index = False
            for d in data:
                for i, u in enumerate(d['users']):
                    if request.user.id == u['id']:
                        index = i
                        break
                if index:
                    del d['users'][index]
                    break
        return Response(data)

class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (authentication.BasicAuthentication, authentication.SessionAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
