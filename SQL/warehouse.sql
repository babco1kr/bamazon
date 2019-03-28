create database bamazonDB;

use bamazonDB;

create table products (
    item_id int(10) not null auto_increment,
    product_name varchar(255) not null,
    department_name varchar(255),
    price int(10),
    stock_quantity int(10)
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Samsung TV", "Electronics", 399, 15), ("PS4", "Electronics", 299, 10),
("Nike Sneakers", "Apparel", 75, 30), ("Ohio State Jersey", "Apparel", 79, 5),
("Windshield Wipers", "Auto", 15, 30), ("Cat Food", "Pets", 14, 7),
("Cat Litter", "Pets", 17, 11), ("Wall Lamp", "Housewares", 15, 4),
("World of Warcraft", "Electronics", 15, 50), ("Wire Shelf", "Housewares", 35, 13);