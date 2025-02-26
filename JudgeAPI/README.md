# Judge Container

This is the execution backend for the Judge System. It runs inside a Docker container and is responsible for compiling and executing code in multiple programming languages. This container must be deployed for the Judge System to function properly.

## Supported Languages
Currently there are only three supported languages, supporting both Direct Execution and Compiled Execution.
* Python (Dynamically Executed)
* Java (Statically Compiled & Executed)
* CSharp (Statically Compiled & Executed)

## Features

- Single file execution
- Supports execution of Python, Java, and C# code
- Isolated execution environment via Docker
- Receives code via HTTP API, compiles (if required), executes, and returns results
- Timeout (Expire execution request if execution duration exceeds ```5 Seconds```.)

## Prerequisites

Ensure you have the following installed before proceeding:

- [Docker](https://docs.docker.com/get-docker/)
- Python 3 (for local development)

## Setup & Deployment

### Building the Docker Image

```sh
sudo docker build -t judge-container .
```

### Running the Container

```sh
sudo docker run -p 5000:5000 --name judge-container judge-container
```

This will start the execution API on port 5000.

### Stopping & Removing the Container

```sh
sudo docker stop judge-container
sudo docker rm judge-container
```

## Folder Structure

```
.
├── app.py            # Main Flask application
├── config.json       # Configuration file for execution settings
├── Dockerfile        # Docker configuration
├── executor.py       # Handles code compilation & execution
├── README.md         # This documentation
├── requirements.txt  # Dependencies
└── scripts           # Additional scripts (if any)
```

## API Usage

### Endpoint: Execute Code

**URL:** `/execute`

**Method:** `POST`

**Payload:**

```json
{
    "language": "python", or "java", "csharp"
    "source_code": "print('Hello, World!')",
    "input_data": "",
    "expected_output": "Hello, World!"
}
```

**Successful Response:**

```json
{
    "Result": "Success"
}
```

**Incorrect Response (Python):**

```json
{
  "Result": "Incorrect", 
  "std_err": "Output does not match expected output", 
  "std_out": "hello"
}
```

**Successful Response (Python):**

```json
{
    "Result": "Success"
}
```

**Error Response (Python):**

```json
{
  "Result": "Error", 
  "std_err": "NameError: name 'it' is not defined"
}
```

### Example Request

Using `curl`:

```sh
curl -X POST http://localhost:5000/execute \
     -H "Content-Type: application/json" \
     -d '{"language":"python", "source_code":"print(\"Hello, World!\")", "input_data":"", "expected_output":"Hello, World!"}'
```

## Troubleshooting

### Check Container Logs

```sh
sudo docker logs judge-container
```

### Restarting the Container

```sh
sudo docker restart judge-container
```

## Performance

Below is a table comparing execution speeds across different programming languages, measured in seconds, based on five separate tests.

| #  | Python (s) | C# (s) | Java (s) |
|----|-----------|--------|---------|
| 1  |     0.021      |    0.429    |    3.341     |
| 2  |     0.016      |    0.435    |    3.420     |
| 3  |     0.016      |    0.425    |    3.349     |
| 4  |     0.016      |    0.429    |    3.412     |
| 5  |     0.015      |    0.416    |    3.360     |
| **Avg** |   0.016   |    0.429    |    3.377     |

## TODO:

1. Currently there is no standard error coming from C# compilation and run operations. This is due to the output captured, rather it all exists within ```std_output```.