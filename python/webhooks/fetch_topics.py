import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def fetch_topics():
    try:
        response = requests.get(f'{api_url}/topics', headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)

topics = fetch_topics()
print(topics)