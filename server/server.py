import json
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def update():
    data = json.loads(request.data)
    if 'kind' and 'identifier' in data:
        return request.data

    else:
        return 'identifier or kind is not in data'

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
