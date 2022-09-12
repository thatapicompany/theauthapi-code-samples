import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/webhooks"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def fetch_webhooks(project_id):
    try:
        response = requests.get(api_url, headers=headers, params={ 'projectId': project_id })
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


project_id = 'REPLACE_WITH_YOUR_PROJECT_ID'
webhooks = fetch_webhooks(project_id)
print(webhooks)
