<h1 align="center">
  <br>
  <img src="./assets/ras-logo.png" alt="RAS" width="200px">
  <br>
    Rest API Starter
  <br>
</h1>

A RESTful API starter to perform basic CRUD operations on a database

## API Documentation

### Routes

All available routes for `Data` for CRUD operations:

- **POST** `/api/v1/data`: Create a new data entry.
- **GET** `/api/v1/data` - Retrieve all data entries, optionally filtered by type.
- **GET** `/api/v1/data/:id` - Retrieve a specific data entry by ID.
- **PATCH** `/api/v1/data/:id` - Update a data entry by ID.
- **DELETE** `/api/v1/data/:id` - Delete a data entry by ID.

### POST : `/api/v1/data`

> Create a new data entry on the Database

#### Request

- **Method**: POST
- **URL**: `http://localhost:9000/api/v1/data`
- **Body**:
  - JSON data containing `type`, `data`, and `metadata` (all fields are required).

Example request body:

```json
{
  "type": "user",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "metadata": {
    "created_at": "2025-01-27T00:00:00Z"
  }
}
```

#### Expected Response

- **Status Code**: 201 (Created)
- **Body**:
  ```json
  {
    "message": "Data Creation: SUCCESS 🚀",
    "data": {
      "_id": "60ccf1b2d5c4d051c8d4e20c",
      "type": "user",
      "data": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "metadata": {
        "created_at": "2025-01-27T00:00:00Z"
      },
      "__v": 0
    }
  }
  ```

### GET : `/api/v1/data`

> Retrieve all data by `type`, i.e., "`?type=user`" from the database

#### Request

- **Method**: GET
- **URL**: `http://localhost:9000/api/v1/data`
- **Query Parameters** (optional):
  - `type`: Filter the data by type (e.g., `type=user`).

Example request URL:

```
http://localhost:9000/api/v1/data?type=user
```

#### Expected Response

- **Status Code**: 200 (OK)
- **Body**:
  ```json
  {
    "message": "Data Retrieval By Type: SUCCESS 🚀",
    "data": [
      {
        "_id": "60ccf1b2d5c4d051c8d4e20c",
        "type": "user",
        "data": {
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        "metadata": {
          "created_at": "2025-01-27T00:00:00Z"
        },
        "__v": 0
      }
    ]
  }
  ```

### GET : `/api/v1/data/:id`

> Retrieve data by id from the database

#### Request

- **Method**: GET
- **URL**: `http://localhost:9000/api/v1/data/:id`
  - Replace `:id` with the ID of the data entry you want to retrieve.

Example request URL:

```
http://localhost:9000/api/v1/data/60ccf1b2d5c4d051c8d4e20c
```

#### Expected Response

- **Status Code**: 200 (OK)
- **Body**:
  ```json
  {
    "message": "Data Retrieval By Id: SUCCESS 🚀",
    "data": {
      "_id": "60ccf1b2d5c4d051c8d4e20c",
      "type": "user",
      "data": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "metadata": {
        "created_at": "2025-01-27T00:00:00Z"
      },
      "__v": 0
    }
  }
  ```

### PATCH : `/api/v1/data/:id`

> Update data by id from the database

#### Request

- **Method**: PATCH
- **URL**: `http://localhost:9000/api/v1/data/:id`
  - Replace `:id` with the ID of the data entry you want to update.
- **Body**: JSON data with the updated values for `type`, `data`, and `metadata`.

Example request body:

```json
{
  "type": "user",
  "data": {
    "name": "John Doe",
    "email": "john.doe.updated@example.com"
  },
  "metadata": {
    "updated_at": "2025-01-27T12:00:00Z"
  }
}
```

#### Expected Response

- **Status Code**: 200 (OK)
- **Body**:
  ```json
  {
    "message": "Data Update By Id: SUCCESS 🚀",
    "data": {
      "_id": "60ccf1b2d5c4d051c8d4e20c",
      "type": "user",
      "data": {
        "name": "John Doe",
        "email": "john.doe.updated@example.com"
      },
      "metadata": {
        "updated_at": "2025-01-27T12:00:00Z"
      },
      "__v": 0
    }
  }
  ```

### DELETE : `/api/v1/data/:id`

> Delete data by id from the database

#### Request

- **Method**: DELETE
- **URL**: `http://localhost:9000/api/v1/data/:id`
  - Replace `:id` with the ID of the data entry you want to delete.

Example request URL:

```
http://localhost:9000/api/v1/data/60ccf1b2d5c4d051c8d4e20c
```

#### Expected Response

- **Status Code**: 200 (OK)
- **Body**:
  ```json
  {
    "message": "Data Deletion By Id: SUCCESS 🚀",
    "data": {
      "_id": "60ccf1b2d5c4d051c8d4e20c",
      "type": "user",
      "data": {
        "name": "John Doe",
        "email": "john.doe.updated@example.com"
      },
      "metadata": {
        "updated_at": "2025-01-27T12:00:00Z"
      },
      "__v": 0
    }
  }
  ```

## Error Handling

If an error occurs, the API will return a response with a `400` or `500` status code, along with a message explaining the issue.

- **400** - Bad Request (e.g., missing required fields).
- **404** - Not Found (e.g., trying to retrieve or delete data by a non-existing ID).
- **500** - Internal Server Error (e.g., database connection issue).

Example error response:

```json
{
  "message": "Data Creation: FAILED 🚨",
  "error": "Unable to create data 😢"
}
```

## Summary of Test Cases

| Method | Endpoint           | Description               | Request Body Example                                  | Expected Response                    |
| ------ | ------------------ | ------------------------- | ----------------------------------------------------- | ------------------------------------ |
| POST   | `/api/v1/data`     | Create new data entry     | `{ "type": "user", "data": {...}, "metadata": {...}}` | 201 Created with data details        |
| GET    | `/api/v1/data`     | Retrieve all data entries | `?type=user` (optional)                               | 200 OK with an array of data entries |
| GET    | `/api/v1/data/:id` | Retrieve data by ID       | `:`id`                                                | 200 OK with a single data entry      |
| PATCH  | `/api/v1/data/:id` | Update data by ID         | `{ "type": "user", "data": {...}, "metadata": {...}}` | 200 OK with updated data             |
| DELETE | `/api/v1/data/:id` | Delete data by ID         | N/A                                                   | 200 OK with deleted data             |
