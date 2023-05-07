CREATE TYPE status AS ENUM ('To Do', 'In progress', 'Completed');
CREATE TYPE priority AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE color AS ENUM ('Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Violet');

CREATE TABLE users
(
    id       integer PRIMARY KEY,
    name     varchar(31) UNIQUE NOT NULL,
    password varchar(63)        NOT NULL
);
CREATE TABLE lists
(
    id      integer PRIMARY KEY,
    name    varchar(31) NOT NULL,
    priority priority,
    user_id integer     NOT NULL REFERENCES users ON DELETE RESTRICT
);
CREATE TABLE tasks
(
    id       integer PRIMARY KEY,
    name     varchar(31) NOT NULL,
    comment  text,
    deadline date,
    status   status      NOT NULL,
    priority priority,
    color    color,
    user_id  integer     NOT NULL REFERENCES users ON DELETE RESTRICT,
    list_id  integer REFERENCES lists ON DELETE RESTRICT
);