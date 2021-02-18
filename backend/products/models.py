from django.db import models

class Product(models.Model):
    # Required
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=200, blank=False, null=False)
    is_reserved = models.BooleanField(blank=False, null=False)
    
    # Not required
    image_url = models.CharField(max_length=300, blank=True, null=True)
    price_in_cents = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}: {self.name}'
