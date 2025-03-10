# Judge System

## Overview

The **Judge System** is an automated grading platform designed to streamline the process of evaluating student submissions.

The system consists of multiple components, including a backend that handles user management, file submission, and grading logic, as well as a frontend that provides users with an interface to interact with the system. The system is built using **React** for the frontend, **ASP.NET 8** for the backend, and leverages **Docker** containers for sandboxed execution of student code.

The Judge System supports multiple programming languages, including Python, C#, and Java, and is designed to provide automated feedback on student code submissions in real-time.

### Project Background

Initially developed during my final academic year, the Judge System successfully automated the evaluation of student code submissions. However, as new requirements emerged, the original implementation, with its suboptimal code structure, proved difficult to adapt.

The Judge System was originally developed for my alma mater, [Institute of Engineering & Management](https://www.iemcal.com), where I studied Infortmation Technology. Before the Judge System was developed, teachers at the institute had to manually check each lab submission file, which involved

- Manually checking if the source code was submitted
- Running the code on their own machine to verify if it worked correctly
- Manually checking the output of the program to match the expected output

This process was not only tedious and time-consuming but also prone to human error, with teachers often spending hours checking a single lab task. The Judge System was developed to automate this process, reducing the risk of mistakes and allowing teachers to focus on providing better feedback to students and improving the overall quality of education.

## Table of Contents

- [Architecture](#architecture)
- [Backend](#backend)
  - [APIs](#apis)
  - [Docker Integration](#docker-integration)
  - [Database](#database)
- [Frontend](#frontend)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Architecture

The **Judge System** is composed of the following key components

- **Frontend (React + Vite)** Provides a responsive user interface for students, teachers, and administrators to interact with the system.
- **Backend (ASP.NET 8)** Handles business logic, such as user authentication, file submission, grading, and saving results.
- **API (Flask + Docker)** A Python-based API that manages the execution of student code within Docker containers for sandboxed execution. Each programming language (Python, C#, Java) runs in its respective Docker image.
- **Database (MS SQL Server)** Stores user information, submissions, grading results, and other system-related data.

## Backend

### APIs

The backend provides a set of APIs to handle

- **User Authentication** Login, registration, and role-based access control (Admin, Teacher, Student).
- **File Submission** Allows students to submit code files (Python, C#, Java) for grading.
- **Grading** Executes the submitted code in a sandboxed environment and returns feedback on the correctness and efficiency of the code.

### Docker Integration

Docker containers are used for executing code in a secure environment. For each language, a dedicated Docker image is used

- **Python** Executes Python code in a Python-based Docker image.
- **C#** Executes C# code using a .NET SDK in a C# Docker image.
- **Java** Executes Java code in a Java-based Docker image.

The Docker images are pre-configured with the necessary SDKs to compile and run code in each respective language.

### Database

The backend uses **MS SQL Server** to store

- **User Data** Including usernames, passwords (hashed), and roles.
- **Submissions** Student code submissions, along with metadata such as timestamps, grades, and feedback.
- **Grades** The results of the code execution, including success/failure and any additional comments or feedback.

## Frontend

### Features

- **User Dashboard** Displays relevant information based on the user role (Student, Teacher, Admin).
- **File Submission** Allows students to submit code for evaluation and track the progress of their submissions.
- **Grading Results** Displays results of the code execution, including whether the code passed the tests and any feedback from the teacher.
- **Role-Based UI** Different UI elements and pages based on the user's role, such as a teacher's grading dashboard or an admin's user management page.

### Tech Stack

**React** + **Vite** + **TailwindCSS**

## Installation

### Backend Setup

1.  Clone the repository

    ```bash
    git clone https://github.com/yourusername/judge-system.git
    cd judge-system
    ```

2.  Install dependencies

    ```
    dotnet restore
    ```

3.  Set up the database (MS SQL Server)

    Create a database and apply migrations

    ```
    dotnet ef database update
    ```

4.  Build and run the backend

    ```
    dotnet run
    ```

5.  Ensure that Docker is running and the necessary images are built for code execution

    ```
    docker-compose up --build
    ```

### Frontend Setup

1. Navigate to the frontend directory

   ```
   cd frontend
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Run the development server

   ```
   npm run dev
   ```

4. Visit the frontend in your browser

   http://localhost:5173

## Usage

Student

`Log in to submit code for grading and view the results.`

Teacher

` View student submissions, grade the code, and provide feedback.`

Admin

`Manage users, roles, and overall system settings.`

## Contributing

If you'd somehow managed to find this repo and would like to contribute, please fork the repository, make your changes, and submit a pull request. I'd love to see what you would do!
