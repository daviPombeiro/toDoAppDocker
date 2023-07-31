CREATE DATABASE toDoApp;

USE toDoApp;
CREATE TABLE users(
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

USE toDoApp;
CREATE TABLE tasks(
    id INT AUTO_INCREMENT,
    description VARCHAR(200),
    status BOOLEAN DEFAULT 0,
    parent INT NULL,
    PRIMARY KEY (id)
);

USE toDoApp;
CREATE TABLE users_tasks(
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
