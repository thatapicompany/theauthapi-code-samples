import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def update_webhook(webhook_id, update_webhook_data):
    try:
        response = requests.patch(f'{api_url}/{webhook_id}', json=update_webhook_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


webhook_id = 'REPLACE_WITH_YOUR_WEBHOOK_ID'
update_webhook_data = {
    'status': 'paused'
}
updated_webhook = update_webhook(webhook_id, update_webhook_data)
print(updated_webhook)
