# Driva Assessment

This project is a full-stack web application consisting of a client-side React application and a server-side Node.js application. The goal of the project is to demonstrate a development setup for both front-end and back-end, using modern JavaScript/TypeScript technologies.

## Architectural Overview

The application follows a **multi-tier architecture** with two main parts:

### 1. **Client-side (React)**

- Built using **React** with **TypeScript** for strong typing and maintainability.
- **Material UI** is used for a modern, responsive design.
- **Axios** is used for API communication between the client and server.
- **React Router** for routing between views.
- **Cypress** for e2e testing

### 2. **Server-side (Node.js + Express)**

- Built using **Node.js** with **Express** to handle API requests.
- **TypeScript** is used for writing type-safe server-side code.
- **CORS** for handling cross-origin requests from the client.
- **Jest** for unit testing and **Supertest** for API testing.

### 3. **Development Workflow**

- The development environment uses **concurrently** to run both client-side and server-side processes simultaneously.

## Project Structure

```
driva-assessment/
├── client/             # Client-side React app
│   ├── package.json    # Client dependencies and scripts
│   └── src/            # Client source code
├── server/             # Server-side Express app
│   ├── package.json    # Server dependencies and scripts
│   └── src/            # Server source code
└── package.json        # Root package.json for managing scripts and dependencies
```

### Key Files

- `client/package.json`: Contains dependencies, scripts, and configurations for the React client.
- `server/package.json`: Contains dependencies, scripts, and configurations for the Express server.
- `package.json` (Root): Contains the `dev` script that runs both the client and server concurrently.

## Prerequisites

Ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (preferably the latest LTS version)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Running the Project

To start both the client and server concurrently from the root directory, use the following command:

```bash
npm run dev
```

This command uses `concurrently` to run both the React client (`react-scripts start`) and the Node.js server (`ts-node-dev src/index.ts`) at the same time.

### Client

The client-side application is a React app. It will be available at [http://localhost:3000](http://localhost:3000).

### Server

The server-side application is a Node.js API using Express. It will be available at [http://localhost:3001](http://localhost:3001).

## Running Tests

You can run the tests for both the client and server using the following commands:

- **Client Tests**: To run tests for the client-side application, use the following command from the root directory:

  ```bash
  npm run test:client
  ```

- **Server Tests**: To run tests for the server-side application, use the following command from the root directory:

  ```bash
  npm run test:server
  ```

- **Server Tests with Coverage**: To run tests with code coverage for the server-side application, use the following command from the root directory:

  ```bash
  npm run test:server:coverage
  ```

## Technologies Used

### Client-side

- React
- TypeScript
- Material UI
- Axios
- React Router
- Cypress (for testing)

### Server-side

- Node.js
- Express
- TypeScript
- Jest (for testing)
- Supertest (for API testing)
- ts-node-dev (for running TypeScript code in development)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
