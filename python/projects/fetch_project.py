import requests
from requests.exceptions import HTTPError

api_url = "https://api.theauthapi.com/projects"
access_key = "REPLACE_WITH_YOUR_ACCESS_KEY"

headers = {
    "x-api-key": access_key,
}

def fetch_project(project_id):
    try:
        response = requests.get(f'{api_url}/{project_id}', headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as error: 
        # handle error
        print(error)


project_id = 'REPLACE_WITH_YOUR_PROJECT_ID'
project = fetch_project(project_id)
print(project)
