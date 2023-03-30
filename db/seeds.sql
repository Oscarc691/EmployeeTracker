INSERT INTO departments (dept_name)
VALUES 
("marketing"),
("accounting"),
("sales"),
("management");

INSERT INTO roles (title, salary, dept_id)
VALUES
("marketer", 50000.00, 1),
("accountant", 90000.00, 2),
("manager", 100000.00, 4),
("salesman", 60000.00, 3),
("assistant-to-regional-manager", 70000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Guy", "Fieri", 3, null),
("Jim", "Halpert", 4, 1),
("Andy", "Dwyer", 4, 1),
("Bert", "Macklin", 3, null),
("Dwight", "Schrute", 5, 6),
("Michael", "Scott", 3, null);
