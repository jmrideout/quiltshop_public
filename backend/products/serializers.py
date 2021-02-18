from .models import Product

class ProductSerializer:
    def __init__(self, data):
        self.data = data

    @property
    def product(self):
        return {
            "id": self.data.id,
            "name": self.data.name,
            "description": self.data.description,
            "image_url": self.data.image_url,
            "price_in_cents": self.data.price_in_cents,
            "is_reserved": self.data.is_reserved,
        }

    @property
    def all_products(self):
        output = {"products": []}
        for product in self.data:
            data = ProductSerializer(product).product
            output["products"].append(data)
        return output
