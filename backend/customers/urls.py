from django.urls import path
from . import views

# customers/
urlpatterns = [
    path('', views.customer_list, name="customer_list"),
    path("<int:customer_id>/", views.customer_detail, name="customer_detail"),
    path('add/', views.add_customer, name="add_customer"),
    path('<int:customer_id>/delete', views.delete_customer, name="delete_customer")
]
