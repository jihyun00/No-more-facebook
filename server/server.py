import simplejson as json

from model import Count
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/update', methods=['POST'])
def update():
    data = json.dumps(request.data)
    data = json.loads(data)
    if 'kind' and 'identifier' in data:
        #add_data = Count.upsert(kind, identifier)
        return request.data
    else:
        return 'There is no "kind" or "identifier"'

@app.route('/get')
def get():
    return 'hi'

if __name__ == "__main__":
    app.run(host="jihyun.nslinkle.com", port=9000, debug=True)
