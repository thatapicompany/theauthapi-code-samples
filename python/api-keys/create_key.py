import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/api-keys"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def create_api_key(api_key):
    try:
        response = requests.post(api_url, json=api_key,  headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)

api_key = {
    "name": "sample python api key",
    "projectId": 'e3fa0aca-ee40-4995-a74b-041f0e5a3daf',
    "customUserId": "charef@theauthapi.com",
    "customAccountId": "C11",
    "expiry": "2023-09-01 00:00:00",
    "rateLimitConfigs": {
        "rateLimit": 33,
        "rateLimitTtl": 120
    }
}

created_key = create_api_key(api_key)
print(created_key)
