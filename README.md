## awesome-ecommerce-database

Localhost:PORT/api/categories
Localhost:PORT/api/tags
Localhost:PORT/api/products

---

Localhost:PORT/api/categories/{id}
Localhost:PORT/api/tags/{id}
Localhost:PORT/api/products{id}

---

Get all
Get by id
Delete by id
Post
Put at id

## Description:

A node command-line application utilizing mysql and express

## Walkthrough

Clone project
Connect to the ecommerce_db = utilize mysqlWorkbench or postgres
Fill out .env file
npm i
Create ecommerce_db, use ecommerce_db, run node seeds/index.js to populate tables
Utilize postman, or similar services, to hit api routes above
</br>
https://vimeo.com/572834702 => Category Routes + Seeding database first
</br>
https://vimeo.com/572834702 => Tag Routes
</br>
https://vimeo.com/572834702 => Product Routes

</br>
Satisfies all of the preceding acceptance criteria plus the following:

- Connects to a MySQL database using the [MySQL2](https://www.npmjs.com/package/mysql) and [Sequelize](https://www.npmjs.com/package/sequelize) packages

- Stores sensitive data, like a user’s MySQL username, password, and database name, using environment variables through the [dotenv](https://www.npmjs.com/package/dotenv) package.

- Syncs Sequelize models to a MySQL database on the server start

- Includes column definitions for all four models outlined in the homework instructions

- Includes model associations outlined in the homework instructions

## GitHub:

https://github.com/Errollinsjr
