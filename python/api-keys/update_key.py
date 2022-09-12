import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/api-keys"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def update_api_key(api_key, update_api_key_data):
    try:
        response = requests.patch(f'{api_url}/{api_key}', json=update_api_key_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


api_key_to_update = 'REPLACE_WITH_YOUR_API_KEY'
update_api_key_data = {
    "name": "python update api key sample",
    "customUserId": "D3",
    "customAccountId": "B12",
    "expiry": "2024-10-10 00:00:00",
    "rateLimitConfigs": {
        "rateLimit": 60,
        "rateLimitTtl": 120
    }
}

updated_api_key = update_api_key(api_key_to_update, update_api_key_data)
print(updated_api_key)