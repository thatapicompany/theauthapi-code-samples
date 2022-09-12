import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def ping_webhook(ping_webhook_data):
    try:
        response = requests.post(f'{api_url}/ping', json=ping_webhook_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


ping_webhook_data = {
    'url': 'https://webhook.site/9f2b7979-f9ce-4ecc-b8a2-299c0b08d114',
    'httpMethod': 'POST',
    'customHeaders': {
        # custom headers added to the request sent to the webhook
    },
    'body': {
        'name': 'My first api key test',
        'key': 'random_key_12412569120',
    }
}
ping_webhook_response = ping_webhook(ping_webhook_data)
print(ping_webhook_response)
