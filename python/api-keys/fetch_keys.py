import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/api-keys"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def fetch_api_keys(filters=None):
    try:
        response = requests.get(api_url, headers=headers, params=filters)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


filters = {
    'name': 'OPTIONAL_NAME_FILTER',
    'customUserId': 'OPTIONAL_CUSTOM_USER_ID_FILTER',
    'customAccountId': 'OPTIONAL_CUSTOM_ACCOUN_ID_FILTER',
    'isActive': "OPTIONAL_IS_ACTIVE_FILTER"
}

# fetch all api keys
api_key = fetch_api_keys()

# fetch all inactive (revoked) api keys
revoked_api_keys = fetch_api_keys({
    'isActive': False
})
print(revoked_api_keys)

# fetch api keys where customUserId equals "C11"
api_keys_filtered_by_customAccountId = fetch_api_keys({
    'customAccountId': 'C11'
})
print(api_keys_filtered_by_customAccountId)
