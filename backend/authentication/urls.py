from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

# authentication/
urlpatterns = [
    path('token', obtain_jwt_token), # obtain token
    path("current_user/", views.current_user, name="current_user"),
    path("users/", views.UserList.as_view())
]
