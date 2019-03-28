create database bamazonDB;

use bamazonDB;

create table products (
    item_id int(10) not null,
    product_name varchar(255) not null,
    department_name varchar(255),
    price int(10),
    stock_quantity int(10)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Samsung TV", "Electronics", 399, 15), ("PS4", "Electronics", 299, 10),
("Nike Sneakers", "Apparel", 75, 30)