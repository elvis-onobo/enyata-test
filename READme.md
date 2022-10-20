# Enyata Store

Enyata e-commerce test project setup guide

## Last Minute Revelation

I realized in the last minutes that I may have thought about the app in a very linear way.

One thing I would have done better is to enable the API to receive multiple products under one order instead of just one product for one order. This way, I would the fetch orders and have all the products belonging to that order so that the client can display all the products in an order.

## Documentation

Please find the Postman documentation for the project here: [Enyata test docs](https://documenter.getpostman.com/view/8410691/2s847MpVxy)

## Installation

Clone the repository

`git clone https://github.com/elvis-onobo/enyata-test`

Navigate to the base directory and install packages

`yarn install`

Traditionally you would be required to create your own **.env** file but since this is a test application and no sensitive keys exist in the .env file, it has been pushed with the repo.
However, you may still change the database variables in the .env file.

Kindly note that while you will need Docker to spin up the database.

So, run `docker-compose up -d` to bring up PostgreSQL.

This project uses Knex query builder for database operations. Run the command below to migrate the database table.

`yarn knex migrate:latest`

Also, I have created dummy product data that you can use in testing rather than calling endpoints to create products(sorry for not seeding data for other fields, I struggled with time with work and the project). To seed the products table, run:

`yarn knex seed:run`

And lastly, run the devlopement server:

`yarn dev`
