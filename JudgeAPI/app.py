from flask import Flask, request, jsonify
import executor  # Ensure this file is named executor.py
import time
import json

# Load configuration from config.json
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

# Initialize Flask app with config
app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify(success=True)

@app.route('/submit', methods=['POST'])
def submit_code():
    """
    Handles the POST request to submit source code for execution and validation.
    """
    start_time = time.time()  # Start timer

    data = request.get_json()

    # Validate Request
    if "language" not in data:
        return jsonify({"Result": "Error", "std_err": "Missing required field: Language"}), 400
    if "sourceCode" not in data:
        return jsonify({"Result": "Error", "std_err": "Missing required field: SourceCode"}), 400
    if "input" not in data:
        return jsonify({"Result": "Error", "std_err": "Missing required field: Input"}), 400
    if "expectedOutput" not in data:
        return jsonify({"Result": "Error", "std_err": "Missing required field: ExpectedOutput"}), 400

    # Call Executor and capture result
    result = executor.execute_code(
        data["language"],
        data["sourceCode"],
        data["input"],
        data["expectedOutput"]
    )

    elapsed_time = time.time() - start_time  # End timer
    print(f"Execution time: {elapsed_time} seconds", flush=True)

    # Return result
    return jsonify(result)

if __name__ == '__main__':
    app.run(
        host=config['app']['host'],
        port=config['app']['port'],
        debug=config['app']['debug']
    )
