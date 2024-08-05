# Cyber Security Awareness - API

## Overview

This directory contains the backend API for the Cyber Security Awareness project. The API is responsible for handling requests, managing data, and delivering messages to the client application.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web application framework for Node.js.
- **SQLite**: SQLite is an in-process library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine..

## Installation

To set up and run the API locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/swapnil-raj-07/Innothon.git
    ```

2. **Navigate to the API directory:**
    ```bash
    cd Innothon/api
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the `api` directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the server:**
    ```bash
    npm start
    ```

The API server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user.
    - Request body: `{ "username": "example", "password": "password123" }`
    - Response: `{ "message": "User registered successfully", "token": "jwt_token" }`

- **POST /auth/login**: Log in an existing user.
    - Request body: `{ "username": "example", "password": "password123" }`
    - Response: `{ "message": "User logged in successfully", "token": "jwt_token" }`

### Messages

- **GET /messages**: Retrieve all messages.
    - Response: `[ { "id": "1", "content": "message content", "type": "info" }, ... ]`

- **POST /messages**: Create a new message.
    - Request body: `{ "content": "message content", "type": "info" }`
    - Response: `{ "message": "Message created successfully", "id": "new_message_id" }`

- **PUT /messages/:id**: Update an existing message.
    - Request body: `{ "content": "updated content", "type": "info" }`
    - Response: `{ "message": "Message updated successfully" }`

- **DELETE /messages/:id**: Delete a message.
    - Response: `{ "message": "Message deleted successfully" }`

## Contributing

We welcome contributions to improve this API. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [your contact information].

