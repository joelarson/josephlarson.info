import requests


session = requests.session()

payload = {
    'grant_type': 'password',
    'username': '',
    'password': '',
    'client_id': 'ghost-admin',
}
r = session.post('http://blog.joslarson.com/ghost/api/v0.1/authentication/token', data=payload)

token = r.json()['access_token']

print(token)

data = {
    'status': 'all',
    'staticPages': 'all',
    'page': '1',
    'include': 'tags',
    'exclude': 'markdown',
}

headers = {
    'Authorization': 'Bearer {}'.format(token)
}

r = session.get('http://blog.joslarson.com/ghost/api/v0.1/posts', data=data, headers=headers)

print(r.text)
