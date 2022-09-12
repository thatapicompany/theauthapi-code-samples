import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def delete_webhook(webhook_id):
    try:
        response = requests.delete(f'{api_url}/{webhook_id}', headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


webhook_id = 'REPLACE_WITH_YOUR_WEBHOOK_ID'
deleted = delete_webhook(webhook_id)
print('Webhook has been deleted?', deleted)
