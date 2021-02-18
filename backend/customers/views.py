from django.shortcuts import render
from django.http import JsonResponse
from .serializers import CustomerSerializer
from .models import Customer
from django.views.decorators.csrf import csrf_exempt
from .forms import CustomerForm
import json

def _get_customer(customer_id):
    """Returns customer object or None"""
    try:
        return Customer.objects.get(id=customer_id)
    except:
        print(f'customer {customer_id} not found')
        return None


# Create your views here.
def customer_list(request):
    customers = Customer.objects.all()
    serialized_customers = CustomerSerializer(customers).all_customers
    return JsonResponse(serialized_customers, status=200)

def customer_detail(request, customer_id):
    customer = _get_customer(customer_id)
    if customer:
        serialized_customer = CustomerSerializer(customer).customer
        return JsonResponse(serialized_customer, status=200)
    else:
        return JsonResponse({"status": "Unable to find customer"}, status=500)

@csrf_exempt
def add_customer(request):
    if request.method == "POST":
        data = json.load(request)
        form = CustomerForm(data)
        if form.is_valid():
            form.save(commit=True)
            return JsonResponse({"status": "Successfully added customer."}, status=200)
        return JsonResponse({"status": "Invalid data."}, status=400)
    else:
        return JsonResponse({"status": "Method not allowed. Use POST."}, status=405)

@csrf_exempt
def delete_customer(request, customer_id):
    if request.method == "POST":
        customer = _get_customer(customer_id)
        if customer:
            customer.delete()
            return JsonResponse({"status": "Successfully removed customer."}, status=200)
        else:
            return JsonResponse({"status":"Cannot find customer."}, status=500)
    else:
        return JsonResponse({"status": "Method not allowed. Use POST."}, status=405)
