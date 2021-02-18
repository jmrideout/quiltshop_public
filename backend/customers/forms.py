from django.forms import ModelForm
from .models import Customer

class CustomerForm(ModelForm):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'address1', 'address2', 'address3', 'city', 'state', 'zipcode', 'zipcode_ext', 'email', 'phone']
