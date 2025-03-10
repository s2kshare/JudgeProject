import subprocess
import os
import uuid
import shutil
import json

# Load language configurations from config.json
with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)
    LANGUAGE_CONFIG = config_data['languages']

def validate_output(std_out, expected_output):
    """
    Validate the output of the program against the expected output.

    Args:
        std_out (str): The output of the program
        expected_output (str): The expected output

    Returns:
        dict: The result of the validation. If the output matches the expected output, the result is a
            dictionary with the key "Result" set to "Success". If the output does not match the expected
            output, the result is a dictionary with the key "Result" set to "Incorrect", and the keys
            "std_err" and "std_out" set to the output of the program and the expected output
            respectively.
    """
    output = std_out.strip()
    if output == expected_output:
        return {"Result": "Success"}
    else:
        return {
            "Result": "Incorrect",
            "std_err": "Output does not match expected output",
            "std_out": output
        }

def execute_code(language, source_code, input_data, expected_output):
    """
    Executes the provided source code in the specified programming language, validates the output 
    against the expected output, and returns the result.

    Args:
        language (str): The programming language of the source code.
        source_code (str): The source code to be executed.
        input_data (str): The input data to be provided to the program.
        expected_output (str): The expected output of the program.

    Returns:
        dict: The result of execution and validation. If successful, returns a dictionary with the
            key "Result" set to "Success". If there is an error or mismatch, returns a dictionary
            with "Result" set to "Error" or "Incorrect", and relevant error messages.
    """
    # Check if the language is supported
    if language not in LANGUAGE_CONFIG:
        return {"Result": "Error", "std_err": f"Unsupported language: {language}"}

    # Retrieve language-specific configuration
    config = LANGUAGE_CONFIG[language]
    ext = config["extension"]
    
    # Create a temporary directory for the source code files
    temp_dir = f"/tmp/{uuid.uuid4()}"
    os.makedirs(temp_dir, exist_ok=True)

    # Determine the filename based on the language
    filename = "Program" if language in ["python", "csharp"] else "Main"
    file_path = os.path.join(temp_dir, f"{filename}{ext}")

    # Write the source code to a file
    with open(file_path, "w") as f:
        f.write(source_code)

    # Compile the code if necessary
    if config["compilation"]:
        compile_process = subprocess.run(
            config["compilationCommand"] + [file_path],
            cwd=temp_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )

        # Check for compilation errors
        if compile_process.returncode != 0:
            shutil.rmtree(temp_dir, ignore_errors=True)
            return {"Result": "Error", "std_err": compile_process.stderr}

    # Prepare the run command
    run_command = config["runCommand"] + ([file_path] if not config["compilation"] else [])
    try:
        # Execute the program
        process = subprocess.Popen(
            run_command,
            cwd=temp_dir,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        stdout, stderr = process.communicate(input=input_data, timeout=5)
    except subprocess.TimeoutExpired:
        # Handle execution timeout
        process.kill()
        shutil.rmtree(temp_dir, ignore_errors=True)
        return {"Result": "Error", "std_err": "Execution timed out"}

    # Clean up the temporary directory
    shutil.rmtree(temp_dir, ignore_errors=True)

    # Validate output and return results
    if process.returncode == 0:
        return validate_output(stdout, expected_output)
    else:
        # Simplify and return the error message
        error_lines = stderr.strip().split("\n")
        simplified_error = error_lines[-1] if error_lines else "Unknown error"
        return {"Result": "Error", "std_err": simplified_error}
