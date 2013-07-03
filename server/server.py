import json

from flask import Flask, request

app = Flask(__name__)

@app.route('/update', methods=['POST'])
def update():
    d = json.loads(request.data)
    print d
    
    if not (d.has_key('kind') and d.has_key('identifier')):
        resp = {
            "success": False,
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
