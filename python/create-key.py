import requests

api_url = "https://api.theauthapi.com/api-keys"
access_key = [ACCESS_KEY] #replace with your access key

headers = {
    "Content-Type": "application/json",
    "x-api-key": access_key,
}

def create_api_key(api_key):
    try:
        response = requests.post(api_url, json=api_key,  headers=headers)
        return response.json()
    except error: 
        # handle error
        print(error)

api_key = {
    "name": "sample python api key",
    "projectId": [PROJECT_ID] #replace with your project id
}

created_key = create_api_key(api_key)
print(created_key)
