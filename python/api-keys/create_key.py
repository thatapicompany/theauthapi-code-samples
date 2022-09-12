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
    "projectId": 'REPLACE_WITH_YOUR_PROJECT_ID'
}

created_key = create_api_key(api_key)
print(created_key)
