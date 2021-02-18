from django.urls import path
from . import views

# products/
urlpatterns = [
    path('', views.product_list, name="product_list"),
    path('get-request-example/', views.get_request_example, name="get_request_example"),

    path('search', views.search, name="search"),
    path('new', views.new_product, name="new_product"),
    path('<int:product_id>/', views.product_detail, name="product_detail"),
    path('<int:product_id>/edit', views.edit_product, name="edit_product"),
    path('<int:product_id>/delete', views.delete_product, name="delete_product"),
]
