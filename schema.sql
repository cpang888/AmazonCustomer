DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (1,"Etekcity 2 pack Voltson" , "Tools & Home Improvement" ,19.98,39);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (2,"Expo 80078 Low Odor Dry Erase Markers","Office Products",6,503);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (3,"Certified Refurbished Amazon Cloud Cam Indoor Security Camera","Amazon Device",79.99,3);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (4,"Certified Refurbished Echo Dot","Amazon Device",29.99,30);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (5,"Codenames","Toys and Games",16.99,10);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (6,"TownleyGirl Disney Princess My Beauty Spa Kit","Toys and Games",8.49,5);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (7,"Blue Yeti USB Microphone","Musical Instructments",129.99,3);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (8,"Leather Laptop Messenger Bag for Men","Electronics",48.49,23);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (9,"Sewing KIT-Premium Set","Arts, Crafts & Sewing",10.16,40);
INSERT INTO products (id, product_name, department_name, price, quantity) VALUES (10,"High Sierra Loop Backpack","Sports & Outdoors",24.32,16);

SELECT * FROM products;
