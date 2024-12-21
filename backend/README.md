# User Registration Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body must be a JSON object with the following fields:

- `fullName`: An object containing:
    - `firstName` (string, required): The user's first name. Must be at least 3 characters long.
    - `lastName` (string, required): The user's last name. Must be at least 3 characters long.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### Example
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Response

### Success Response
- **Status Code**: `201 Created`
- **Body**:
    ```json
    {
        "user": {
            "_id": "user_id",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "password": "hashed_password",
            "socketId": null
        },
        "token": "jwt_token"
    }
    ```

### Error Responses
- **Status Code**: `400 Bad Request`
    - **Description**: Validation errors or missing required fields.
    - **Body**:
        ```json
        {
            "errors": [
                {
                    "msg": "Please enter a valid email",
                    "param": "email",
                    "location": "body"
                },
                {
                    "msg": "Password must be at least 6 characters long",
                    "param": "password",
                    "location": "body"
                },
                {
                    "msg": "First name must be at least 3 characters long",
                    "param": "fullName.firstName",
                    "location": "body"
                }
            ]
        }
        ```

## Notes
- Ensure that the email provided is unique and not already registered in the system.
- Passwords are hashed before being stored in the database for security purposes.
- A JWT token is generated and returned upon successful registration.
