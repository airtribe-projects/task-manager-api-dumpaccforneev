# Task Management API

## Overview

This is a simple Task Management API built with Node.js and Express. It allows users to manage tasks with features such as:

- Adding new tasks
- Updating existing tasks
- Deleting tasks
- Filtering tasks by completion status
- Sorting tasks by creation date
- Assigning priority levels to tasks
- Retrieving tasks by priority level

The API provides CRUD (Create, Read, Update, Delete) operations for managing tasks. Each task has the following fields:

- `id`: A unique identifier for the task.
- `title`: A string representing the task's title.
- `description`: A string describing the task.
- `completed`: A boolean indicating whether the task is complete.
- `createdAt`: The date when the task was created.
- `priority`: A string indicating the task's priority (`low`, `medium`, or `high`).

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14+)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   By default, the server will run on http://localhost:3000.

4. Run the tests:

   ```bash
   npm test
   ```

   This will run a series of automated tests to ensure the API is functioning correctly.

## API Endpoints

### 1. Create a New Task

**Endpoint**: `POST /tasks`

**Description**: Creates a new task.

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": "medium"
}
```

**Response**:
- 201 Created: The task was successfully created.

**Example cURL Request**:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New Task", "description": "Task description", "completed": false, "priority": "medium"}'
```

### 2. Get All Tasks

**Endpoint**: `GET /tasks`

**Description**: Retrieves all tasks. You can also filter tasks by completion status and sort by creation date.

**Query Parameters**:
- `completed`: (optional) Filter tasks by completion status (true or false).

**Response**:
- 200 OK: Returns a list of all tasks.

**Example cURL Request**:
```bash
curl -X GET http://localhost:3000/tasks?completed=true
```

### 3. Get a Task by ID

**Endpoint**: `GET /tasks/:id`

**Description**: Retrieves a specific task by its ID.

**Response**:
- 200 OK: The task was found.
- 404 Not Found: The task with the given ID does not exist.

**Example cURL Request**:
```bash
curl -X GET http://localhost:3000/tasks/1
```

### 4. Update a Task

**Endpoint**: `PUT /tasks/:id`

**Description**: Updates an existing task by its ID.

**Request Body**:
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "priority": "high"
}
```

**Response**:
- 200 OK: The task was successfully updated.
- 400 Bad Request: Invalid input data (e.g., invalid completed value or missing fields).
- 404 Not Found: The task with the given ID does not exist.

**Example cURL Request**:
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Task", "description": "Updated description", "completed": true, "priority": "high"}'
```

### 5. Delete a Task

**Endpoint**: `DELETE /tasks/:id`

**Description**: Deletes a task by its ID.

**Response**:
- 200 OK: The task was successfully deleted.
- 404 Not Found: The task with the given ID does not exist.

**Example cURL Request**:
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### 6. Get Tasks by Priority

**Endpoint**: `GET /tasks/priority/:level`

**Description**: Retrieves tasks by priority level (low, medium, or high).

**Response**:
- 200 OK: Returns a list of tasks with the specified priority.
- 400 Bad Request: Invalid priority level.

**Example cURL Request**:
```bash
curl -X GET http://localhost:3000/tasks/priority/high
```

## Error Handling

The API returns appropriate error messages and status codes for invalid requests:

- 400 Bad Request: Invalid input data, such as missing required fields or invalid data types.
- 404 Not Found: Task not found for the specified ID.
- 500 Internal Server Error: General server error.