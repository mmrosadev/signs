# Signs API

## Project Description

Signs API is a simple RESTful API built with **Node.js**, **Express**, and **SQLite**. It allows managing zodiac signs information, including name, element, dates, and characteristic traits. The API also includes interactive documentation using **Swagger**.

---

## Technologies Used

- Node.js
- Express
- SQLite
- Swagger UI

---

## Install dependencies

Navigate to the project folder:

```bash
cd signs
npm install
```

---

## Running the Server

Start the server:

```bash
npm run start
```

The server will be available at:

```
http://localhost:3000
```

---

## API Endpoints

### Zodiac Signs

- `GET /signs` - List all zodiac signs.
- `GET /signs/:id` - Get a zodiac sign by ID.
- `POST /signs` - Create a new zodiac sign.

Example POST request body:

```json
{
  "name": "Aries",
  "element": "Fire",
  "startDate": "21/03",
  "endDate": "20/04",
  "traits": "Courageous, determined, confident"
}
```

- `PUT /signs/:id` - Update all fields of a zodiac sign.
- `PATCH /signs/:id` - Update specific fields of a zodiac sign.
- `DELETE /signs/:id` - Delete a zodiac sign by ID.

---

## API Documentation

Interactive documentation is available via **Swagger UI**:

```
http://localhost:3000/api-docs
```

Here you can explore and test all endpoints directly from your browser.

---

## Database Structure

Table `signs`:

| Field     | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| id        | INTEGER | Primary key                   |
| name      | TEXT    | Name of the zodiac sign       |
| element   | TEXT    | Element (Fire, Earth, etc.)   |
| startDate | TEXT    | Start date of the zodiac sign |
| endDate   | TEXT    | End date of the zodiac sign   |
| traits    | TEXT    | Characteristic traits         |

---

## Notes

- The SQLite database persists locally in the `signs.db` file.
- Swagger provides a visual interface to explore and test the endpoints.

---
