
-- DROP DATABASE IF EXISTS giffy;

DROP TABLE IF EXISTS LIKED;
DROP TABLE IF EXISTS COMENTARIO;
DROP TABLE IF EXISTS GIF;
DROP TABLE IF EXISTS USUARIO;

-- Crear tabla GIF
CREATE TABLE GIF (
    id VARCHAR(255) PRIMARY KEY,
    likes INTEGER DEFAULT 0 CHECK (likes >= 0)
);

-- Crear tabla USUARIO
CREATE TABLE USUARIO (
	id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    pass VARCHAR(50) NOT NULL,
    img VARCHAR(255)
);

-- Crear tabla LIKED
CREATE TABLE LIKED (
    name VARCHAR(20),
    gif_id VARCHAR(255),
    PRIMARY KEY (name, gif_id),
    FOREIGN KEY (name) REFERENCES USUARIO(name) ON DELETE CASCADE,
    FOREIGN KEY (gif_id) REFERENCES GIF(id) ON DELETE CASCADE
);

-- Crear tabla COMENTARIO
CREATE TABLE COMENTARIO (
    num INT,
    gif_id VARCHAR(255),
    name VARCHAR(20),
    text TEXT,
    PRIMARY KEY (gif_id, name, num),
    FOREIGN KEY (gif_id) REFERENCES GIF(id) ON DELETE CASCADE,
    FOREIGN KEY (name) REFERENCES USUARIO(name) ON DELETE CASCADE
);

INSERT INTO USUARIO (id, name, pass, img)
VALUES ('4a12a2', 'peparda', '8887', 'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg'),
	('aabh1', 'pepe', 'pepe1234', 'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg'),
('AsfG8', 'elma', 'tute', NULL);

INSERT INTO GIF (id, likes) 
VALUES
('5364668726146715938', 0),
('6079604226118308780', 20),
('2886510168956344697', 15043);

-- OJO, abajo hay solamente 2 likes para el gif 2, pero aún así hay 20 likes en la tabla GIF. En el backend hay que evitar esto.

INSERT INTO LIKED (name, gif_id) 
VALUES
('peparda', '5364668726146715938'),
('peparda', '6079604226118308780'),
('pepe', '6079604226118308780'),
('elma', '2886510168956344697');


-- SERIAL no sirve porque la idea es que es una combinación (num, gif, name). 
-- Si ponés SERIAL cada entrada tiene número diferente, pero en realidad se debería poder repetir entre diferentes personas.
-- tal vez haya que hacerlo desde el backend.

INSERT INTO COMENTARIO (num, gif_id, name, text)
VALUES
(1,'5364668726146715938', 'pepe', 'Qué gif de porquería.'),
(2,'5364668726146715938', 'pepe', 'Qué gif de porquería.'),
(3,'5364668726146715938', 'pepe', 'Qué gif de porquería.'),
(1,'6079604226118308780', 'elma', 'Hermoso gif.')


-- SELECT *
-- FROM usuario NATURAL JOIN comentario
-- WHERE name = 'pepe'


-- SELECT id
-- FROM gif
-- WHERE likes >= 15000


-- SELECT (name, gif_id)
-- FROM comentario
-- GROUP BY (name, gif_id)
-- HAVING COUNT(num) > 1