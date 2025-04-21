# 🚀 RESTful-API Starter Kit

Starter Kit for building modern RESTful APIs with scalable 🏗️, modular 🧩, and secure 🔐 architecture. Suitable for use as an initial foundation for developing small to large scale backend applications, equipped with various built-in features that are ready to use 🧰 and easy to develop further 🚧.

---

## 🚀 Built-in Features

- ✅ Authentication
- 🧼 Input Validation & Sanitation
- 🔐 Password Hashing
- 🔑 JWT Token Auth
- 🔄 Database Switching (MySQL / PostgreSQL)
- 🧩 Modular
- 📦 ORM Sequelize
- 🧯 Handling errors
- 🏗️ Scalable Project Structure
- 🛡️ Rate Limiting
- 📛 Security Headers
- ⚡ Redis Caching
- ❤️ Health Check & Monitoring
- 🐂 Asynchronous Task Handling (Bull Queue)
- 📥 Upload File Handlers
- 🔁 Graceful Shutdown
- 🎛️ Request Profiling
- 🔒 HTTP Compression
- 🚨 Anomaly Detection
- 🌐 Webhook

---

## 📊 Status Monitoring

#### Endpoint

```
GET http://localhost:5000/status
```

---

## 🐂 Task Handling

#### Endpoint

```
POST http://localhost:5000/api/v1/tasks/add
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


---

## 🧠 Redis Caching

#### Endpoint

```
GET http://localhost:5000/api/v1/data/:key
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


---

## 👤 Example Case (Login, Register, Get All User, User Detail, Edit User Detail)

> *For testing purposes, you can import the `sample.sql` sample file available in the `/src/config/sample.sql` directory.*

### Register

#### Endpoint
```
POST http://localhost:5000/api/v1/auth/register
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |

#### Body Request

```
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Response

```
{
  "message": "Registration successful",
  "user": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
}
```

### Login

#### Endpoint

```
POST http://localhost:5000/api/v1/auth/login
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |

#### Body Request

```
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Response

```
{
  "message": "Login successful",
  "token": "your_jwt_token_here"
}
```

### All Users

#### Endpoint

```
GET http://localhost:5000/api/v1/auth/users
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


#### Header Authorization:

| Key             | Value                           |
|:----------------|:--------------------------------|
| Authorization   | Bearer `<your_jwt_token_here>`  |

#### Response

```
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ...
]
```

### Users Detail

#### Endpoint

```
GET http://localhost:5000/api/v1/auth/profile
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


#### Header Authorization:

| Key             | Value                           |
|:----------------|:--------------------------------|
| Authorization   | Bearer `<your_jwt_token_here>`  |

#### Response

```
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "createdAt": "2025-04-21T00:42:41.000Z"
}
```

### Users Edit

#### Endpoint

```
PUT http://localhost:5000/api/v1/auth/profile
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


#### Header Authorization:

| Key             | Value                           |
|:----------------|:--------------------------------|
| Authorization   | Bearer `<your_jwt_token_here>`  |

#### Body Request

```
{
  "name": "John New",
  "email": "Johnnew@example.com",
  "password": "123456"
}
```

#### Response

```
{
    "message": "Profile updated successfully",
    "user": {
        "id": 1,
        "name": "John New",
        "email": "Johnnew@example.com",
        "createdAt": "2025-04-21T01:13:14.000Z",
        "updatedAt": "2025-04-21T01:13:45.000Z"
    }
}
```

---

## File Upload
#### Endpoint

```
POST http://localhost:5000/api/v1/upload/:folderName

Default Location: public/uploads
```

#### Header Request (If using ApiKey)

| Key             | Value                           |
|:----------------|:--------------------------------|
| x-api-key       | my_secret_api_key               |


#### Body Request (form-data)

| Key           | Type		| Value                    |
|:--------------|:----------|:-------------------------|
| file       	| file		| Select File         |


#### Response

```
{
    "message": "File uploaded successfully",
    "file": {
        "fieldname": "file",
        "originalname": "your-image.jpeg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "public/uploads/",
        "filename": "1744786296980-815431101.jpeg",
        "path": "public\\uploads\\1744786296980-815431101.jpeg",
        "size": 582884
    }
}
```

---

## 🗂️ Folder Structure

```
rest-api-starter/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── service/
│   └── utils/
├── .env
├── .gitignore
├── package.json
└── app.js
```
