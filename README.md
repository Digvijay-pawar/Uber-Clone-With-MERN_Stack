# Backend Documentation of Uber clone

## User Registration Endpoint Documentation

### Endpoint
`POST /users/register`

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body
The request body must be a JSON object with the following fields:

- `fullName`: An object containing:
    - `firstName` (string, required): The user's first name. Must be at least 3 characters long.
    - `lastName` (string, required): The user's last name. Must be at least 3 characters long.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

#### Example
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

### Response

#### Success Response
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

## Login Endpoint Documentation

### Endpoint
`POST /users/login`

### Description
This endpoint is used to authenticate a user. It requires the user's email and password.

### Request Body
The request body must be a JSON object with the following fields:

- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

#### Example
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: `200 OK`
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
            "socketId": null
        },
        "token": "jwt_token"
    }
    ```

#### Error Responses
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
                }
            ]
        }
        ```

### Notes
- Ensure that the email provided is registered in the system.
- Passwords are verified against the hashed passwords stored in the database.
- A JWT token is generated and returned upon successful login.

## Get User Profile Endpoint Documentation

### Endpoint
`GET /users/profile`

### Description
This endpoint is used to get the authenticated user's profile. It requires a valid JWT token.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "_id": "user_id",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
    ```

#### Error Responses
- **Status Code**: `401 Unauthorized`
    - **Description**: Invalid or missing JWT token.
    - **Body**:
        ```json
        {
            "message": "Unauthorized"
        }
        ```

## Logout Endpoint Documentation

### Endpoint
`POST /users/logout`

### Description
This endpoint is used to log out a user. It requires a valid JWT token.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "message": "User logged out successfully"
    }
    ```

#### Error Responses
- **Status Code**: `401 Unauthorized`
    - **Description**: Invalid or missing JWT token.
    - **Body**:
        ```json
        {
            "message": "Unauthorized"
        }
        ```

## Captain Registration Endpoint Documentation

### Endpoint
`POST /captains/register`

### Description
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

### Request Body
The request body must be a JSON object with the following fields:

- `fullName`: An object containing:
    - `firstName` (string, required): The captain's first name. Must be at least 3 characters long.
    - `lastName` (string, required): The captain's last name. Must be at least 3 characters long.
- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The captain's password. Must be at least 6 characters long.
- `vehicle`: An object containing:
    - `color` (string, required): The vehicle color. Must be at least 3 characters long.
    - `plate` (string, required): The vehicle plate. Must be at least 3 characters long.
    - `capacity` (number, required): The vehicle capacity. Must be at least 1.
    - `vehicleType` (string, required): The vehicle type. Must be one of ["car", "motorcycle", "auto"].

#### Example
```json
{
    "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Response

#### Success Response
- **Status Code**: `201 Created`
- **Body**:
    ```json
    {
        "captain": {
            "_id": "captain_id",
            "fullName": {
                "firstName": "Jane",
                "lastName": "Doe"
            },
            "email": "jane.doe@example.com",
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            },
            "status": "inactive"
        },
        "token": "jwt_token"
    }
    ```

## Captain Login Endpoint Documentation

### Endpoint
`POST /captains/login`

### Description
This endpoint is used to authenticate a captain. It requires the captain's email and password.

### Request Body
The request body must be a JSON object with the following fields:

- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The captain's password. Must be at least 6 characters long.

#### Example
```json
{
    "email": "jane.doe@example.com",
    "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "captain": {
            "_id": "captain_id",
            "fullName": {
                "firstName": "Jane",
                "lastName": "Doe"
            },
            "email": "jane.doe@example.com",
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            },
            "status": "inactive"
        },
        "token": "jwt_token"
    }
    ```

#### Error Responses
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
                }
            ]
        }
        ```

## Get Captain Profile Endpoint Documentation

### Endpoint
`GET /captains/profile`

### Description
This endpoint is used to get the authenticated captain's profile. It requires a valid JWT token.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "_id": "captain_id",
        "fullName": {
            "firstName": "Jane",
            "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
    ```

#### Error Responses
- **Status Code**: `401 Unauthorized`
    - **Description**: Invalid or missing JWT token.
    - **Body**:
        ```json
        {
            "message": "Unauthorized"
        }
        ```

## Captain Logout Endpoint Documentation

### Endpoint
`POST /captains/logout`

### Description
This endpoint is used to log out a captain. It requires a valid JWT token.

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "message": "Captain logged out successfully"
    }
    ```

#### Error Responses
- **Status Code**: `401 Unauthorized`
    - **Description**: Invalid or missing JWT token.
    - **Body**:
        ```json
        {
            "message": "Unauthorized"
        }
        ```