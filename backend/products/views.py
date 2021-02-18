from django.shortcuts import render
from django.http import JsonResponse
from .forms import ProductForm
from .models import Product
from .serializers import ProductSerializer
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def get_request_example(request):
    print(request.GET) # QuerySet
    print(request.GET.get("size")) # Value of size param
    print(request.GET.getlist("color")) # Values of color params
    return JsonResponse(data={'status':"success"}, status=200)


def search(request):
    """Filters by parameters found in description"""
    keywords = request.GET.values()
    print('searching by following keywords:')
    print(keywords)
    products = Product.objects.all()
    for key in keywords:
        products = products.filter(description__icontains=key)
    print(products)
    serialized_products = ProductSerializer(products).all_products
    return JsonResponse(data={'products': serialized_products}, status=200)

def _get_product(product_id):
    try:
        return Product.objects.get(id=product_id)
    except:
        return None

def product_list(request):
    products = Product.objects.order_by('id')
    serialized_products = ProductSerializer(products).all_products
    return JsonResponse(data=serialized_products, status=200)

def product_detail(request, product_id):
    """Gets the product with matching ID, if possible."""
    product = _get_product(product_id)
    if product:
        serialized_product = ProductSerializer(product).product
        return JsonResponse(data=serialized_product, status=200)
    else:
        return JsonResponse(data={"status": "Error 500: Bad Server Request"}, status=500)

@csrf_exempt
def new_product(request):
    if request.method == "POST":
        data = json.load(request)
        form = ProductForm(data)
        if form.is_valid():
            product = form.save(commit=True)
            serialized_product = ProductSerializer(product).product
            return JsonResponse(serialized_product, status=202)
        else:
            return JsonResponse({"error": "Error 500: Bad Server request."}, status=500)
    else:
        return JsonResponse({"error": "Error 405: Method not allowed."}, status=405)

@csrf_exempt
def edit_product(request, product_id):
    if request.method == "POST":
        product = _get_product(product_id)
        if product:
            form = ProductForm(json.load(request), instance=product)
            print('found product')
            if form.is_valid():
                form.save(commit=True)
                return JsonResponse({"status": "Successfully edited product"}, status=202)

        # If product doesn't exist or form is not valid:
        return JsonResponse({"error": "Error 400: Bad request."}, status=400)
    else:
        return JsonResponse({"error": "Error 405: Method not allowed."}, status=405)

@csrf_exempt
def delete_product(request, product_id):
    if request.method == "POST":
        product = _get_product(product_id)
        if product:
            product.delete()
            return JsonResponse({"status": "Successfully deleted product."}, status=202)

        return JsonResponse({"error": "Error 400: Bad request."}, status=400)
    else:
        return JsonResponse({"error": "Error 405: Method not allowed."}, status=405)

# Can be done with form
# def reserve_product(request, product_id):
#     if request.method == "POST":
#         product = _get_product(product_id)
#         if product:
#             product.is_reserved = True
#             product.save()
