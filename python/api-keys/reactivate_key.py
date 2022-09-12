import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/api-keys"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def reactivate_api_key(api_key):
    try:
        response = requests.patch(f'{api_url}/{api_key}/reactivate', headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


api_key_to_reactivate = 'REPLACE_WITH_YOUR_API_KEY'

reactivated_api_key = reactivate_api_key(api_key_to_reactivate)
print(reactivated_api_key)