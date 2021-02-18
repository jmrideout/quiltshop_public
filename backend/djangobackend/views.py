from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .validate_address import validator
import json

def index(request):
    index_body = '''
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QuiltShop API</title>
        </head>
        <body>
            <h1>QuiltShop API</h1>
            <h2>
        </body>
    </html>
        '''
    return HttpResponse(index_body)

@csrf_exempt
def validate_address(request):
    if request.method == "POST":
        data = json.load(request)
        print(data)
        verified_address = validator(data)
        print(verified_address)
        return JsonResponse(verified_address, status=200)
    else:
        return JsonResponse({"error": "Error 405: Method not allowed."}, status=405)
