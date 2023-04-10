# Josh Tasks

## Summary

This full stack application is a web-based solution designed to help users manage their tasks and compare them to others across the world!

The frontend of the application is built using popular web technologies, namely HTML, CSS, JavaScript, TypeScript, and React to create a dynamic and interactive user interface.

The backend of the application is powered by Node, Express, TypeScript, and Prisma, providing a robust and scalable server-side solution for handling API requests, processing data, and interacting with the database.

The application data is stored in a SQL database, specifically MySQL, which provides high reliability, security, and scalability. Using the Prisma ORM (Object Relational Mapping) the backend and database are able to communicate effectively to perform CRUD (Create, Read, Update, Delete) operations.

User authentication and authorization is handled using JWTs (JSON Web Token) to ensure that the data is secure and only accessible to authorized users.

Overall, this full stack application is designed to be user friendly, fast, and efficient, providing users with an intuitive and responsive interface that allows them to create and manage their tasks and compare then to others with ease. The application is easily scalable, and its modular architecture allows for easy maintenance and updates in the future.

## Architecture

Frontend: The frontend layer is responsible for presenting the user interface and handling user interactions. It communicates with the backend via REST APIs sending requests to retrieve or modify data. Built using HTML, CSS, JavaScript, TypeScript, and React.

Backend: The backend layer is responsible for processing requests from the frontend and interacting with the database to retrieve or store data. It implements RESTful APIs, handles business logic manages security, authentication, and authorization. Built using Node, Express, TypeScript, and Prisma.

Database: The database layer is responsible for storing and managing the data required by the application. It stores the data in a structured format and provides a way for the backend to retrieve, modify, and delete data. Built using MySQL and communicates to the backend via the Prisma ORM.

## Technologies

Frontend: HTML, CSS, JavaScript, TypeScript, React, Vite, and React Router.

Backend: Node, Express, TypeScript, Prisma, bcrypt, jsonwebtoken, and nodemailer.

Database: MySQL.

Other: Git, GitHub, Docker, Railway.

## Comments

### Frontend

Tooling: Although there are many options Vite is used for the frontend tooling.

CSS: The design of the frontend is meant to be dark and minimal. After building so many light theme projects I wanted to change it up and use a dark theme. I also wanted to use sidebar navigation, meaning it had to be compatible with mobile devices. This is solved with a media query to place the navigation above the page at a small enough screen size.

Routes: Routing is handled using the React Router package. This package is by far the most popular method to handle routing in a React project. There are three routing parents on the frontend. First, everything is wrapped in the Root that handles the layout of the UI. Secondly, there is a private set of routes that requires a sign in to use. Lastly, there is a public set of routes that requires a sign out to use. The private set includes pages such as "My Tasks" and so on, while the public set includes routes such as "Sign In" and "Sign Up". This logic is enforced using navigation, so if you attempt to visit a private route while signed out you will be pushed to a public route.

Context: Although many prefer to use a global state manager like Redux, React has a built in option now called Context. This feature is utilized to store the user of the application.

Components: While each page is a component, a few other custom components are used. A notable one is the "Task" component. This component is passed props from the parent and is built using such values. This powerful tool allows a flexible way to build UI across the application.

Hooks: Many built in hooks are used throughout the application, such as useState and useEffect, but a few custom hooks are used. Such as the useUser hook that is used throughout the application to verify the existence of a user. This hook fetches from the backend and modifies the Context of the application accordingly.

### Backend

MVC (Model View Controller): The backend of the application follows the MVC design methodology to create strong organization, flexibility, reusability, testability, and scalability.

Middleware: Middleware is also used throughout the backend to improve code organization, reusability, flexibility, performance, and security. A typical one used is an authorization check on protected routes. Routes that involve sensitive operations, like create, update, and delete, are protected by an authorization middleware to ensure that the user attempting to access such routes is allowed access. This specific middleware checks the credentials (JWT) of the user to prevent impersonation. Another common middleware used is an error handler.

Error Handling: As described above an error handling middleware is used to catch unexpected exceptions. Otherwise, try and catch statements are used to handle expected errors and return an appropriate response. A good example is the verification process of the JWT. The verification process throws an error when an invalid token is provided. So, this method is wrapped in another try catch so when it does through a 401 code with error message json is returned.

HTTP Methods: To create a RESTful backend proper HTTP methods are used. That is for create, read, update, and delete, "POST", "GET", "PUT", and "DELETE" are used respectively.

Responses: To create RESTful backend proper responses also need to be returned. That means using proper codes, and a common data format. This is done using responses such as 401 for unauthorized, 404 for not found, 201 for creates, and so forth. This also means using JSON as the response data format in the event data is sent. This is done and common values are used. For example all error messages use the variable "errorMessage".

Data: As this is a RESTful API the service is stateless, so the application data is stored in a database. The database communication is done via the ORM Prisma. Many are split on the use of an ORM but for the purposes of this application it is fitting.

### Database

SQL: SQL was used for this application for its reliability, security, and scalability.

### Other

Git: Like all projects Git is used for version control. Git Ignore is also used to protect sensitive data.

GitHub: The repository for this project is stored on GitHub like all my projects.

Docker: All my projects utilize docker consistency, portability, efficiency, scalability, version control, and isolation. For this project only the builds are made using docker but the development environments can also be built using docker.

Railway: This application is hosted on Railway for its ease of use, low cost, and GitOps.
