DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pwd VARCHAR(60) NOT NULL
);

SELECT * FROM usuario;