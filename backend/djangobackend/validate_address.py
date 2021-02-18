import requests
import json


def validator(address_dict):
    """
    address_dict must include:
    {
        "street_address": [strings of address lines],
        "city": "city name",
        "state": "Full name of state",
        "zipcode": zipcode
    }
    """

    url = "https://onlinetools.ups.com/addressvalidation/v1/1?regionalrequestindicator=false"

    payload = {
        "XAVRequest": {
            "AddressKeyFormat": {
                "AddressLine": address_dict["street_address"],
                "PoliticalDivision1": address_dict["state"],
                "PoliticalDivision2": address_dict["city"],
                "PostcodePrimaryLow": address_dict["zipcode"],
                "PostcodeExtendedLow": "0000",
                "CountryCode": "US"
            }
        }
    }

    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'AccessLicenseNumber': 'LICENSE NUMBER', # Add upon deploy
        'Username': 'user name',                 # Add upon deploy
        'Password': 'my password'                # Add upon deploy
    }

    response = requests.request("POST", url, headers=headers, data=json.dumps(payload))

    return response.json()

