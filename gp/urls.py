
from django.contrib import admin
from django.urls import path , include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.views.generic import TemplateView;

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.schemas import get_schema_view

from rest_framework.documentation import include_docs_urls

api_urlpatterns = [
    path('accounts/', include('rest_registration.api.urls'))
]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('api/',include('chat.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',TemplateView.as_view(template_name='index.html')),
    path('schema/', get_schema_view(
        title='API Schema',
        description='Guide for the REST API'
    ), name='api_schema'),
    path('docs/', include_docs_urls()),
]
