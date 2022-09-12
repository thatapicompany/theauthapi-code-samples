import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def create_webhook(create_webhook_data):
    try:
        response = requests.post(api_url, json=create_webhook_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


create_webhook_data = {
    'name': 'Test webhook',
    'url': 'https://webhook.site/a61857c1-ead8-4c2a-86a3-ebc910db2271',
    'projectId': 'REPLACE_WITH_YOUR_PROJECT_ID',
    'topics': ['api-key.created', 'api-key.firstUsed'],
    'httpMethod': 'POST',
    'customHeaders': {
        # custom headers added to the request sent to the webhook
    },
    'status': 'live'
}
created_webhook = create_webhook(create_webhook_data)
print(created_webhook)
