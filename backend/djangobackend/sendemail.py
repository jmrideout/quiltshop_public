# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
#import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json

# quiltshop
SENDGRID_DATA = json.load(open('sendgridkey.json', 'r'))

message = Mail(
    from_email='quiltshop@protonmail.com',
    to_emails='destination@email.com', #destination
    subject='Sending with Twilio SendGrid is Fun',
    html_content='<strong>and easy to do anywhere, even with Python</strong>')
try:
    sg = SendGridAPIClient(SENDGRID_DATA["SENDGRID_API_KEY"])
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e.body)



'''
# API json request
import http.client

conn = http.client.HTTPSConnection("api.sendgrid.com")

payload = "{\"personalizations\":[{\"to\":[{\"email\":\"john.doe@example.com\",\"name\":\"John Doe\"}],\"dynamic_template_data\":{\"verb\":\"\",\"adjective\":\"\",\"noun\":\"\",\"currentDayofWeek\":\"\"},\"subject\":\"Hello, World!\"}],\"from\":{\"email\":\"noreply@johndoe.com\",\"name\":\"John Doe\"},\"reply_to\":{\"email\":\"noreply@johndoe.com\",\"name\":\"John Doe\"},\"template_id\":\"<<YOUR_TEMPLATE_ID>>\"}"

headers = {
    'authorization': "Bearer <<YOUR_API_KEY_HERE>>",
    'content-type': "application/json"
    }

conn.request("POST", "/v3/mail/send", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
'''