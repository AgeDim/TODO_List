SET search_path TO public;

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
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE tasks
(
    id       serial PRIMARY KEY,
    name     varchar(255) NOT NULL,
    deadline date,
    status   varchar(20) NOT NULL,
    priority varchar(20),
    list_id  integer NOT NULL REFERENCES task_lists(id) ON DELETE CASCADE
);