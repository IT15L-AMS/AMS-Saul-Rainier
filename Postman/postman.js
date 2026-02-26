{
  "info": {
    "name": "AMS Backend API",
    "_postman_id": "f1b2c3d4-e5f6-7890-1234-56789abcdef0",
    "description": "Postman collection for Academic Management System backend testing",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth - Register",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"full_name\": \"Admin User\",\n  \"email\": \"admin@example.com\",\n  \"password\": \"password123\",\n  \"role\": \"Admin\"\n}"
        },
        "url": { "raw": "http://localhost:5000/auth/register", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["auth", "register"] }
      },
      "response": []
    },
    {
      "name": "Auth - Login",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"admin@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": { "raw": "http://localhost:5000/auth/login", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["auth", "login"] }
      },
      "response": []
    },
    {
      "name": "Students - Create",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{adminToken}}" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"full_name\": \"John Doe\",\n  \"email\": \"johndoe@example.com\",\n  \"year_level\": 2,\n  \"program\": \"BSIT\"\n}"
        },
        "url": { "raw": "http://localhost:5000/students", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["students"] }
      },
      "response": []
    },
    {
      "name": "Students - Get All",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{adminToken}}" }],
        "url": { "raw": "http://localhost:5000/students", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["students"] }
      },
      "response": []
    },
    {
      "name": "Courses - Create",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{adminToken}}" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"course_code\": \"IT101\",\n  \"title\": \"Intro to IT\",\n  \"units\": 3\n}"
        },
        "url": { "raw": "http://localhost:5000/courses", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["courses"] }
      },
      "response": []
    },
    {
      "name": "Enrollments - Enroll Student",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{adminToken}}" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"student_id\": 1,\n  \"course_id\": 1\n}"
        },
        "url": { "raw": "http://localhost:5000/enrollments", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["enrollments"] }
      },
      "response": []
    },
    {
      "name": "Grades - Assign Grade",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{instructorToken}}" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"enrollment_id\": 1,\n  \"grade\": \"A\",\n  \"remarks\": \"Excellent\"\n}"
        },
        "url": { "raw": "http://localhost:5000/grades", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["grades"] }
      },
      "response": []
    },
    {
      "name": "Dashboard - Admin",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{adminToken}}" }],
        "url": { "raw": "http://localhost:5000/dashboard/admin", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["dashboard", "admin"] }
      },
      "response": []
    },
    {
      "name": "Dashboard - Student",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{studentToken}}" }],
        "url": { "raw": "http://localhost:5000/dashboard/student", "protocol": "http", "host": ["localhost"], "port": "5000", "path": ["dashboard", "student"] }
      },
      "response": []
    }
  ],
  "variable": [
    { "key": "adminToken", "value": "" },
    { "key": "studentToken", "value": "" },
    { "key": "instructorToken", "value": "" }
  ]
}