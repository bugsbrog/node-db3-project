-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT
    p.ProductName,
    c.CategoryName
FROM Category as c
JOIN Product as p
    ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT
    o.Id,
    s.CompanyName
FROM 'Order' as o
JOIN Shipper as s
    ON s.id = o.ShipVia
WHERE OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT
    ProductName,
    Quantity
FROM Product as p
JOIN OrderDetail as od
    ON p.id = od.ProductID
WHERE OrderId = 10251
ORDER BY ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT
    o.Id,
    c.CompanyName,
    e.LastName
FROM 'Order' as o
JOIN Customer as c
    ON o.CustomerId = c.Id
JOIN Employee as e
    ON o.EmployeeId = e.Id;