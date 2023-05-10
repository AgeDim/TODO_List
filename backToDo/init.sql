SET search_path TO public;
CREATE TYPE status AS ENUM ('To Do', 'In progress', 'Completed');
CREATE TYPE priority AS ENUM ('High', 'Medium', 'Low');

CREATE TABLE users
(
    id       serial PRIMARY KEY,
    email     varchar(255) UNIQUE NOT NULL,
    password varchar(255)        NOT NULL
);
CREATE TABLE task_lists
(
    id      serial PRIMARY KEY,
    name    varchar(31) NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE RESTRICT
);
CREATE TABLE tasks
(
    id       serial PRIMARY KEY,
    name     varchar(255) NOT NULL,
    deadline date,
    status   status      NOT NULL,
    priority priority,
    list_id  integer NOT NULL REFERENCES task_lists(id) ON DELETE RESTRICT
);