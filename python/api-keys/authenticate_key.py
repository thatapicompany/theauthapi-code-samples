import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/api-keys"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def authenticate_api_key(api_key):
    try:
        response = requests.post(f'{api_url}/auth/{api_key}', headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error:
        if error.response.status_code == 404:
            # handle invalid key
            print("Invalid API key")
        else:
            # handle other error
            print(error)

key_to_authenticate = 'REPLACE_WITH_YOUR_API_KEY'
authenticated_key = authenticate_api_key(key_to_authenticate)
print(authenticated_key)
