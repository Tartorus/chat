from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    url(r'^dialog$', DialogList.as_view()),
    url(r'^dialog/(?P<pk>[0-9]+)$', DialogDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
