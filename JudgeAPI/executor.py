import subprocess
import os
import uuid
import shutil

# Configuration for supported languages
LANGUAGE_CONFIG = {
    "python": {
        "extension": ".py",
        "runCommand": ["python3"],
        "compilation": False,
        "compilationCommand": None
    },
    "java": {
        "extension": ".java",
        "runCommand": ["java"],
        "compilation": True,
        "compilationCommand": ["javac"]
    },
    "csharp": {
        "extension": ".cs",
        "runCommand": ["dotnet", "run"],
        "compilation": True,
        "compilationCommand": ["dotnet", "build"]
    }
}

def validate_output(std_out, expected_output):
    """
    Validate the output of the program against the expected output

    Args:
        std_out (str): The output of the program
        expected_output (str): The expected output of the program

    Returns:
        dict: A dictionary containing the result of the validation:
            - Result: "Success" if the output matches the expected output, otherwise "Incorrect"
            - std_err: A string with the error message
            - std_out: The actual output of the program
    """
    output = std_out.strip()
    return {"Result": "Success"} if output == expected_output else {"Result": "Incorrect", "std_err": "Output does not match expected output", "std_out": output}

def execute_code(language, source_code, input_data, expected_output):
    """
    Executes the provided source code in the specified programming language, validates the output 
    against the expected output, and returns the result.

    Args:
        language (str): The programming language of the source code (e.g., 'python', 'java', 'csharp').
        source_code (str): The source code to be executed.
        input_data (str): The input data to be provided to the program during execution.
        expected_output (str): The expected output to validate against the program's actual output.

    Returns:
        dict: A dictionary containing the execution result:
            - "Result": "Success" if the output matches the expected output, otherwise "Incorrect" or "Error".
            - "std_err": Error message if any occurred during compilation or execution.
            - "std_out": The actual output of the program, if applicable.

    Raises:
        subprocess.TimeoutExpired: If the execution exceeds the allowed timeout duration.
    """

    if language not in LANGUAGE_CONFIG:
        return {"Result": "Error", "std_err": f"Unsupported language: {language}"}

    config = LANGUAGE_CONFIG[language]
    ext = config["extension"]
    temp_dir = f"/tmp/{uuid.uuid4()}"
    os.makedirs(temp_dir, exist_ok=True)

    filename = "Program" if language in ["python", "csharp"] else "Main"
    file_path = os.path.join(temp_dir, f"{filename}{ext}")
    print(file_path, flush=True)

    with open(file_path, "w") as f:
        f.write(source_code)

    # Unique due to current workaround (Build and Debugging errors)
    if language == "csharp":
        # Create a .NET project
        subprocess.run(["dotnet", "new", "console", "-n", "CSharpJudge"], cwd=temp_dir, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Overwrite Program.cs with user code
        program_path = os.path.join(temp_dir, "CSharpJudge", "Program.cs")
        with open(program_path, "w") as f:
            f.write(source_code)
        
        # Change temp_dir to the project folder
        temp_dir = os.path.join(temp_dir, "CSharpJudge")

    # If Language requires compilation
    if config["compilation"]:
        compile_process = subprocess.run(
            config["compilationCommand"] if language == "csharp" else config["compilationCommand"] + [file_path],
            cwd=temp_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )

        if compile_process.returncode != 0:
            shutil.rmtree(temp_dir, ignore_errors=True)
            return {"Result": "Error", "std_err": compile_process.stderr}

    run_command = config["runCommand"] + ([file_path] if not config["compilation"] else [])
    if language == "java":
        run_command = ["java", "-cp", temp_dir, "Main"]
    elif language == "csharp":
        run_command = ["dotnet", "run"]

    try:
        process = subprocess.Popen(
            run_command,
            cwd=temp_dir,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True
        )
        stdout, stderr = process.communicate(input=input_data, timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()
        shutil.rmtree(temp_dir, ignore_errors=True)
        return {"Result": "Error", "std_err": "Execution timed out"}

    shutil.rmtree(temp_dir, ignore_errors=True)
    if process.returncode == 0:
        return validate_output(stdout, expected_output)
    else:
        # Extract only the last line of stderr
        error_lines = stderr.strip().split("\n")
        simplified_error = error_lines[-1] if error_lines else "Unknown error"
        return {"Result": "Error", "std_err": simplified_error}