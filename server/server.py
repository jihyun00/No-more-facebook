import simplejson as json
import db

from flask import Flask, request, jsonify


app = Flask(__name__)

@app.route('/update', methods=['GET'])
def update():
    d = json.dumps(request.data)
    print d

    if not ('kind' in d and 'identifier' in d):
        resp = {
            "success": False, #added code which insert data to db
            "msg": 'There is no kind or identifier in request body',
	    "content": ""
	}
        return json.dumps(resp)
    else:
        return json.dumps({"success": True, "msg": "","content":""})
    

@app.route('/get')
def get():
    return 'hi'

if __name__ == "__main__":
    app.run(host="jihyun.nslinkle.com", port=9000, debug=True)
