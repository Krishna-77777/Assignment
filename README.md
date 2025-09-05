Node.js Healthcare Management API
A secure backend system for a healthcare application built with Node.js, Express, and PostgreSQL. It provides a RESTful API for user authentication and the management of patient and doctor records.

## Features
User Authentication: Secure user registration and login using JSON Web Tokens (JWT).

Patient Management: Full CRUD (Create, Read, Update, Delete) operations for patient records, scoped to the authenticated user.

Doctor Management: Full CRUD operations for doctor records.

Patient-Doctor Mapping: Functionality to assign doctors to patients and manage these relationships.

Secure Endpoints: Middleware protects sensitive routes, ensuring only authenticated users can access them.

Database Migrations: Uses Sequelize CLI for managing database schema changes systematically.

## Tech Stack 🛠️
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Authentication: JSON Web Token (jsonwebtoken), bcryptjs

Environment Variables: dotenv

## Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v18.x or later recommended)

npm (comes with Node.js)

PostgreSQL

## Getting Started 🚀
Follow these steps to get your local development environment set up and running.

1. Clone the Repository
Bash

git clone https://github.com/your-username/healthcare-api.git
cd healthcare-api
2. Install Dependencies
Bash

npm install
3. Set Up the Database
Make sure your PostgreSQL server is running. Connect to it and create a new user and database for this project.

SQL

-- Example commands in psql
CREATE DATABASE healthcare_db;
CREATE USER myuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE healthcare_db TO myuser;
4. Configure Environment Variables
Create a .env file in the root of the project. Copy the contents of the .env.example below into your new file and update the values with your database credentials and a new JWT secret.

.env.example
Code snippet

# Server Configuration
PORT=3000

# Database Configuration
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=healthcare_db
DB_HOST=localhost
DB_DIALECT=postgres

# JWT Secret Key
JWT_SECRET=generate_a_long_random_secret_key
5. Run Database Migrations
This command will create all the necessary tables in your database based on the Sequelize models.

Bash

npx sequelize-cli db:migrate
6. Start the Server
To run the server in development mode with automatic restarts on file changes:

Bash

nodemon server.js
Or, to run it normally:

Bash

node server.js
Your API server should now be running at http://localhost:3000.

## API Endpoints 🔑
All requests and responses are in JSON format. Protected routes require a JWT in the Authorization header (Bearer <token>).

Authentication
Method	Endpoint	Description
POST	/api/auth/register	Registers a new user with a name, email, and password.
POST	/api/auth/login	Logs in a user and returns a JWT.

Export to Sheets
Patient Management (Authentication Required)
Method	Endpoint	Description
POST	/api/patients	Adds a new patient record for the logged-in user.
GET	/api/patients	Retrieves all patients created by the logged-in user.
GET	/api/patients/:id	Gets details of a specific patient.
PUT	/api/patients/:id	Updates a specific patient's details.
DELETE	/api/patients/:id	Deletes a specific patient record.

Export to Sheets
Doctor Management (Authentication Required)
Method	Endpoint	Description
POST	/api/doctors	Adds a new doctor record.
GET	/api/doctors	Retrieves a list of all doctors.
GET	/api/doctors/:id	Gets details of a specific doctor.
PUT	/api/doctors/:id	Updates a specific doctor's details.
DELETE	/api/doctors/:id	Deletes a specific doctor record.

Export to Sheets
Patient-Doctor Mapping (Authentication Required)
Method	Endpoint	Description
POST	/api/mappings	Assigns a doctor to one of the user's patients. Body: { "patientId", "doctorId" }.
GET	/api/mappings	Retrieves all of the user's patients and their assigned doctors.
GET	/api/mappings/:patientId	Gets all doctors assigned to a specific patient.
DELETE	/api/mappings	Removes a doctor from a patient. Body: { "patientId", "doctorId" }.

Export to Sheets
## Testing
The API can be tested using an API client like Postman or Insomnia.

Register a new user to get started.

Use the /api/auth/login endpoint to get a JWT.

For all protected routes, add an Authorization header with the value Bearer <your_jwt_token>.
