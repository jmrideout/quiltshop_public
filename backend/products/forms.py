from django.forms import ModelForm
from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'image_url', 'price_in_cents', 'is_reserved']
