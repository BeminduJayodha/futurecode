# REST API with Node.js + Express + MySQL

This is a simple RESTful API built with **Node.js**, **Express**, and **MySQL** using **Sequelize** as the ORM.  
It includes basic user registration and login (without authentication) and full CRUD operations for a `Product` model.

## 🚀 Features

- User registration and login (no authentication or JWT)
- CRUD operations for products:
  - Create
  - Read (all and single)
  - Update
  - Delete

## 🧱 Tech Stack

- Node.js
- Express
- MySQL
- Sequelize ORM

## 📦 Product Model

```js
{
  name: STRING,
  price: FLOAT,
  quantity: INTEGER
}

