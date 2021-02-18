from django.db import models

# Create your models here.
class Customer(models.Model):
    first_name  = models.CharField(max_length=100)
    last_name   = models.CharField(max_length=100)
    address1    = models.CharField(max_length=100)
    address2    = models.CharField(max_length=100, blank=True)
    address3    = models.CharField(max_length=100, blank=True)
    city        = models.CharField(max_length=100)
    state       = models.CharField(max_length=100)
    zipcode     = models.CharField(max_length=5)
    zipcode_ext = models.CharField(max_length=4, blank=True)
    email       = models.EmailField()
    phone       = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'
