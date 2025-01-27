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

/////////////////////

## How To Use This Repository?

This repository is designed to be a forkable starting point for developers to:

1. Quickly connect to a NoSQL database using MongoDB Atlas.
2. Build and deploy a RESTful API without setting up boilerplate code from scratch.
3. Easily deploy the API to production via platforms as AWS or Render.

This starter API provides a simple yet scalable foundation for creating RESTful APIs, making it easy to customize and extend according to your needs. By default, you can CREATE any types of data (i.e., users, posts, comments, products), READ that data, UPDATE that data and of course, DELETE that data.

### Getting Started

#### 1. Fork This Repository

1. Go to the GitHub repository page.
2. Click the **Fork** button at the top right corner to create your own copy of the repository.
3. Clone the forked repository to your local machine using:
   ```bash
   git clone <your-forked-repo-url>
   ```

#### 2. Create a New MongoDB Atlas Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up for a free account if you don't already have one.
2. Create a new database cluster by following these steps:
   - Click **Build a Cluster** and choose a cloud provider and region (free tier available).
   - Once the cluster is created, click **Connect** and follow the steps to:
     - Whitelist your IP address (or choose "Allow access from anywhere").
     - Create a new database user with a username and password.
3. Copy the connection string (URI) provided by MongoDB Atlas.

#### 3. Create the `.env.development` File

At the root of your project, create a new file named `.env.development` and replace the placeholders with your actual values:

```env
PORT="9000"
DATABASE="mongodb"
MONGO_URI="<your-mongodb-connection-uri>"
NODE_ENV="development"  # Optional, defaults to 'development'
```

Note, you can create additional .env variable files based on the environment such as `.env.test` or `.env.production`, that way you can use different databases for different env as well.

##### Example `MONGO_URI`

For example, if your MongoDB Atlas username is `admin` and password is `password123`, your URI might look like this:

```env
MONGO_URI="mongodb+srv://admin:password123@cluster0.mongodb.net/?retryWrites=true&w=majority"
```

> **Important:** Do not hardcode sensitive information like passwords directly into your codebase. For production, use environment secrets provided by your deployment platform.

#### 4. Start Local Development

To start the development server locally:

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. The server should now be running at `http://localhost:9000`. You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

#### 5. Deploy API to Production

You can deploy the API to a production environment using either **Render** or **AWS**:

##### Deploying to Render

1. Go to [Render](https://render.com/) and create an account.
2. Create a new **Web Service**:
   - Connect your forked GitHub repository.
   - Add the environment variables (`PORT`, `DATABASE`, `MONGO_URI`, `NODE_ENV`) under the **Environment** tab.
   - Set the **Start Command** to `npm start`.
3. Render will automatically build and deploy your API.

##### Deploying to AWS

1. Set up an AWS account if you don’t already have one.
2. Use AWS Elastic Beanstalk or AWS Lambda to deploy your API:
   - For **Elastic Beanstalk**:
     - Package your app, upload it, and configure the environment variables (`PORT`, `DATABASE`, `MONGO_URI`, `NODE_ENV`).
     - AWS will handle the deployment and scaling.
   - For **Lambda + API Gateway**:
     - Use tools like [Serverless Framework](https://www.serverless.com/) or [AWS SAM](https://aws.amazon.com/serverless/sam/) to deploy your API.
     - Set up your MongoDB Atlas credentials securely in AWS Secrets Manager.

> **Tip:** Always test the deployment on a staging environment before pushing to production.

## Notes for Developers

- Feel free to customize the API routes, models, and middleware to fit your use case.
- Regularly review and update dependencies for security.
- Add automated tests to ensure the API works as expected during development and deployment.

This repository gives you the quickest path to creating and deploying a scalable RESTful API. Hope it helps... enjoy coding! 🚀
