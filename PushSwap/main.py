import size3, size5, morethan_5, sys, for100, random 
from flask import Flask, request, jsonify
import json
import logging


app = Flask(__name__)
@app.route('/receive_json', methods=['POST'])

def receive_json():
    try:
        data = request.get_json()
        print(type(data))
        #logger = logging.getLogger(__name__)
        #logger.info(data)
        #message = data.get('input')
        # ...
       # if isinstance(message, str):
            # Convert the input string into a list
           # message = [item.strip() for item in message.split(',')]
        # Call the main() function and store the result in a variable
        #result = main(message)
        #with open('input.json') as f:
        #    data = json.load(f)
        
       # message = data.get('numbers2')
        
        #result = main(message)
        #return jsonify({'success': True, 'result': result})
        return (data)
    except:
        return #jsonify({'success': False, 'error': 'Invalid JSON data'})
    

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    app.run()