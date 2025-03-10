from flask import Flask, request, jsonify
import executor  # Ensure this file is named executor.py
import time

app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify(success=True)

@app.route('/submit', methods=['POST'])
def submit_code():
    """
    Handles the POST request to submit source code for execution and validation.

    The request must include the following JSON fields:
        - Language: The programming language of the source code (e.g., 'python', 'java', 'csharp').
        - SourceCode: The source code to be executed.
        - Input: The input data to be provided to the program during execution.
        - ExpectedOutput: The expected output to validate against the program's actual output.

    Returns:
        A JSON response containing:
            - Result: "Success" if the output matches the expected output, otherwise "Incorrect" or "Error".
            - std_err: Error message if any occurred during execution.
            - std_out: The actual output of the program, if applicable.
    """

    start_time = time.time()  # Start timer

    data = request.get_json()

    # Validate Request
    if "Language" not in data or "SourceCode" not in data or "Input" not in data or "ExpectedOutput" not in data:
        return jsonify({"Result": "Error", "std_err": "Missing required fields"}), 400

    # Call Executor and capture result
    result = executor.execute_code(
        data["Language"],
        data["SourceCode"],
        data["Input"],
        data["ExpectedOutput"]
    )

    elapsed_time = time.time() - start_time  # End timer
    print(elapsed_time, flush=True)

    # Return result
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)