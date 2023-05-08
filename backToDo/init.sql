CREATE TYPE status AS ENUM ('To Do', 'In progress', 'Completed');
CREATE TYPE priority AS ENUM ('High', 'Medium', 'Low');

CREATE TABLE users
(
    id       serial PRIMARY KEY,
    name     varchar(31) UNIQUE NOT NULL,
    password varchar(63)        NOT NULL
);
CREATE TABLE task_lists
(
    id      serial PRIMARY KEY,
    name    varchar(31) NOT NULL,
    user_id integer NOT NULL REFERENCES users ON DELETE RESTRICT
);
CREATE TABLE tasks
(
    id       serial PRIMARY KEY,
    name     varchar(255) NOT NULL,
    comment  text,
    deadline date,
    status   status      NOT NULL,
    priority priority,
    list_id  integer NOT NULL REFERENCES lists ON DELETE RESTRICT
);