# Todo List


# Todo List Backend API

This is the backend API for a Todo List application. It provides CRUD (Create, Read, Update, Delete) operations for managing tasks.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [API Endpoints](#api-endpoints)
3. [Request and Response Examples](#request-and-response-examples)
4. [Setup and Run](#setup-and-run)

---

## Technologies Used

- **Java**
- **Spring Boot**
- **PostgreSQL**
- **JPA (Java Persistence API)**
- **Maven**

---

## API Endpoints

| HTTP Method | Endpoint          | Description                     |
|-------------|-------------------|---------------------------------|
| `GET`       | `/api/tasks`      | Get all tasks                  |
| `GET`       | `/api/tasks/{id}` | Get a task by ID               |
| `POST`      | `/api/tasks`      | Create a new task              |
| `PUT`       | `/api/tasks/{id}` | Update an existing task by ID  |
| `DELETE`    | `/api/tasks/{id}` | Delete a task by ID            |

---

## Request and Response Examples

### 1. **Get All Tasks**

#### Request:
- **Method**: `GET`
- **URL**: `/api/tasks`

#### Response:
```json
[
    {
        "id": 1,
        "title": "Complete project",
        "task_is_done": false,
        "created_at": "2023-10-01T12:00:00.000+00:00",
        "priority": 1,
        "due_date": "2023-10-10T12:00:00.000+00:00"
    },
    {
        "id": 2,
        "title": "Buy groceries",
        "task_is_done": true,
        "created_at": "2023-10-02T12:00:00.000+00:00",
        "priority": 2,
        "due_date": "2023-10-05T12:00:00.000+00:00"
    }
]
```

### 2. **Get Task by ID**

#### Request:
- **Method**: `GET`
- **URL**: `/api/tasks/{id}`

#### Response:
```json
{
    "id": 1,
    "title": "Complete project",
    "task_is_done": false,
    "created_at": "2023-10-01T12:00:00.000+00:00",
    "priority": 1,
    "due_date": "2023-10-10T12:00:00.000+00:00"
}
```

### 3. **Create a New Task**

#### Request:
- **Method**: `POST`
- **URL**: `/api/tasks`
- **Body**:
```json
{
    "title": "Learn Spring Boot",
    "task_is_done": false,
    "created_at": "2023-10-03T12:00:00.000+00:00",
    "priority": 1,
    "due_date": "2023-10-15T12:00:00.000+00:00"
}
```

#### Response:
```json
{
    "id": 3,
    "title": "Learn Spring Boot",
    "task_is_done": false,
    "created_at": "2023-10-03T12:00:00.000+00:00",
    "priority": 1,
    "due_date": "2023-10-15T12:00:00.000+00:00"
}
```

### 4. **Update a Task**

#### Request:
- **Method**: `PUT`
- **URL**: `/api/tasks/{id}`
- **Body**:
```json
{
    "title": "Complete project",
    "task_is_done": true,
    "created_at": "2023-10-01T12:00:00.000+00:00",
    "priority": 1,
    "due_date": "2023-10-10T12:00:00.000+00:00"
}
```

#### Response:
```json
{
    "id": 1,
    "title": "Complete project",
    "task_is_done": true,
    "created_at": "2023-10-01T12:00:00.000+00:00",
    "priority": 1,
    "due_date": "2023-10-10T12:00:00.000+00:00"
}
```

### 5. **Delete a Task**

#### Request:
- **Method**: `DELETE`
- **URL**: `/api/tasks/{id}`

#### Response:
- **Status**: 204 No Content

---

## Setup and Run

### Prerequisites
- Java 23
- Maven
- PostgreSQL

### Database Configuration
1. Create a PostgreSQL database:
```sql
CREATE DATABASE todolist;
```

2. Configure the database connection in `application.properties`:
```properties
# DataSource Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/todolist
spring.datasource.username=USERNAME
spring.datasource.password=PASSWORD

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Build and Run
1. Build the application with Maven:
```bash
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`.

---

# Authors

* [Ali FAHS](https://github.com/fahsAli)
* [Christian HASBANI](https://github.com/Christian-Hasbani)