CREATE DATABASE perntodo;




CREATE TABLE items (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    quantity INTEGER NOT NULL DEFAULT 0,  
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_supplier_name ON suppliers(name);  -- For quick searches by name

-- Customers Table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_customer_name ON customers(name);

-- Purchase Orders Table (links to suppliers and items)
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,  -- Foreign key, restrict delete if referenced
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,  -- Calculated as quantity * item.price, but stored for simplicity
    status VARCHAR(50) DEFAULT 'Pending',  -- e.g., Pending, Fulfilled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_po_supplier ON purchase_orders(supplier_id);  -- Speed up joins/searches
CREATE INDEX idx_po_item ON purchase_orders(item_id);

-- Sales Orders Table (similar to purchases)
CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_so_customer ON sales_orders(customer_id);
CREATE INDEX idx_so_item ON sales_orders(item_id);