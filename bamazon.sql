DROP DATABASE IF EXISTS bamazonDB; 

CREATE DATABASE bamazonDB; 

USE bamazonDB; 

CREATE TABLE products ( 
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL, 
    PRIMARY KEY (item_id)
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cubii Jr: desk Elliptical", "Health",184.99,200); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nespresso Vertuo Plus","Food",129.99,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big Bang Theory Season 1 Digital Collection","Movies",60.00,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Charging Pad","Electronis",11.99,300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apeman Dash Cam","Auto",39.97,500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer Desk","Furniture",131.00,150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Polarized Sunglasses","Clothing",14.70,8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steam Iron","Household",35.19,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KungFu Panda Movie","Electronis",14.99,500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Earbuds","Electronics",20.00,1000);