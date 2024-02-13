-- Create Authors Table
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL
);

-- Create Books Table
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    genre VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INT,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

-- Create Customers Table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20)
);

-- Create Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Order_Details Table
CREATE TABLE Order_Details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    book_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);










-- sql queries

-- 1.Retrieve a List of Top-Selling Books:
SELECT 
    b.title,
    a.author_name,
    SUM(od.quantity) AS total_sold
FROM 
    Books b
INNER JOIN 
    Order_Details od ON b.book_id = od.book_id
INNER JOIN 
    Authors a ON b.author_id = a.author_id
GROUP BY 
    b.title,
    a.author_name
ORDER BY 
    total_sold DESC;


-- 2.Calculate Total Sales Revenue for a Given Period:
SELECT 
    b.title,
    a.author_name,
    SUM(od.quantity) AS total_sold
FROM 
    Books b
INNER JOIN 
    Order_Details od ON b.book_id = od.book_id
INNER JOIN 
    Authors a ON b.author_id = a.author_id
GROUP BY 
    b.title,
    a.author_name
ORDER BY 
    total_sold DESC;