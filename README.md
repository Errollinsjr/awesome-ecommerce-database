## awesome-ecommerce-database

Localhost:PORT/api/categories
</br>
Localhost:PORT/api/tags
</br>
Localhost:PORT/api/products

---

Localhost:PORT/api/categories/{id}
</br>
Localhost:PORT/api/tags/{id}
</br>
Localhost:PORT/api/products{id}

---

Get all
</br>
Get by id
</br>
Delete by id
</br>
Post
</br>
Put at id

## Description:

A node command-line application utilizing mysql and express

## Walkthrough

Clone project
</br>
Connect to the ecommerce_db = utilize mysqlWorkbench or postgres
</br>
Fill out .env file
</br>
npm i
</br>
Create ecommerce_db, use ecommerce_db, run node seeds/index.js to populate tables
</br>
Utilize postman, or similar services, to hit api routes above
</br>
[Video1](https://vimeo.com/578308253) => Starting project + Seeding database first
</br>
[Video2](https://vimeo.com/578308538) => Category Routes
</br>
[Video3](https://vimeo.com/578308827) => Category + Tag Routes
</br>
[Video4](https://vimeo.com/578308984) => Product Routes
</br>
![ecommerce](https://user-images.githubusercontent.com/43302610/126735586-9d92b149-1a30-49ad-8158-f3c0b58f2dab.jpg)
</br>
Satisfies all of the preceding acceptance criteria plus the following:

- Connects to a MySQL database using the [MySQL2](https://www.npmjs.com/package/mysql) and [Sequelize](https://www.npmjs.com/package/sequelize) packages

- Stores sensitive data, like a user’s MySQL username, password, and database name, using environment variables through the [dotenv](https://www.npmjs.com/package/dotenv) package.

- Syncs Sequelize models to a MySQL database on the server start

- Includes column definitions for all four models outlined in the homework instructions

- Includes model associations outlined in the homework instructions

## GitHub:

https://github.com/Errollinsjr
