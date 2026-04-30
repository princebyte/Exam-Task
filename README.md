# Student CRUD App

A beginner-friendly full-stack Node.js application for managing students using Express, MongoDB, and Mongoose.

## Features

- Create, read, update, and delete students
- MongoDB/Mongoose data model
- REST API under `/api/students`
- Simple single-page frontend in `public/index.html`
- Inline marks editing
- Clean async/await-based code with error handling

## Project Structure

- `models/Student.js`
- `routes/students.js`
- `public/index.html`
- `server.js`

## Requirements

- Node.js 18+ recommended
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start MongoDB locally, or set your connection string:

```bash
set MONGODB_URI=mongodb://127.0.0.1:27017/student_crud
```

If you use MongoDB Atlas, replace the value with your Atlas URI.

3. Run the app:

```bash
npm start
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## API Endpoints

- `GET /api/students` - Fetch all students
- `POST /api/students` - Add a new student
- `GET /api/students/:id` - Get a student by ID
- `PUT /api/students/:id` - Update student details
- `DELETE /api/students/:id` - Delete a student

## Example Request Body

```json
{
  "name": "Asha",
  "rollNumber": "CS101",
  "branch": "CSE",
  "marks": 92
}
```

## Notes

- `rollNumber` must be unique.
- `marks` must stay between 0 and 100.
- The frontend uses the Fetch API and automatically refreshes the table after changes.
