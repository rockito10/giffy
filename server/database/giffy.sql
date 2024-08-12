
-- DROP DATABASE IF EXISTS giffy;

DROP TABLE IF EXISTS LIKED;
DROP TABLE IF EXISTS COMMENT;
DROP TABLE IF EXISTS GIF;
DROP TABLE IF EXISTS USER_;

-- Crear tabla GIF
CREATE TABLE GIF (
    gif_id VARCHAR(255) PRIMARY KEY,
    gif_likes INTEGER DEFAULT 0 CHECK (gif_likes >= 0)
);

-- Crear tabla USUARIO
CREATE TABLE USER_ (
	user_id VARCHAR(64) PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    avatar VARCHAR(255)
);

-- Crear tabla LIKED
CREATE TABLE LIKED (
    user_id VARCHAR(64),
    gif_id VARCHAR(255),
    PRIMARY KEY (user_id, gif_id),
    FOREIGN KEY (user_id) REFERENCES USER_(user_id) ON DELETE CASCADE,
    FOREIGN KEY (gif_id) REFERENCES GIF(gif_id) ON DELETE CASCADE
);

-- Crear tabla COMENTARIO
CREATE TABLE COMMENT (
    comment_id INT,
    gif_id VARCHAR(255),
    user_id VARCHAR(64),
    text TEXT,
    PRIMARY KEY (gif_id, user_id, comment_id),
    FOREIGN KEY (gif_id) REFERENCES GIF(gif_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USER_(user_id) ON DELETE CASCADE
);

INSERT INTO USER_ (user_id, user_name, password, avatar)
VALUES ('1', 'peparda', '8887', 'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg'),
	('aabh1', 'pepe', 'pepe1234', 'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg'),
('AsfG8', 'elma', 'tute', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWr2cGxyoLycYjH4lNBn7fsS8p-tNUFeZVjw&s'),
('gg2838', 'gust99', 'vivaLePep', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWr2cGxyoLycYjH4lNBn7fsS8p-tNUFeZVjw&s');

INSERT INTO GIF (gif_id, gif_likes) 
VALUES
('5364668726146715938', 0),
('6079604226118308780', 0),
('2886510168956344697', 0);

-- OJO, abajo hay solamente 2 likes para el gif 2, pero aún así hay 20 likes en la tabla GIF. En el backend hay que evitar esto.

INSERT INTO LIKED (user_id, gif_id) 
VALUES
('1', '5364668726146715938'),
('1', '6079604226118308780'),
('aabh1', '6079604226118308780'),
('aabh1', '2886510168956344697');


-- SERIAL no sirve porque la idea es que es una combinación (num, gif, name). 
-- Si ponés SERIAL cada entrada tiene número diferente, pero en realidad se debería poder repetir entre diferentes personas.
-- tal vez haya que hacerlo desde el backend.

INSERT INTO COMMENT (comment_id, gif_id, user_id, text)
VALUES
(1,'5364668726146715938', 'aabh1', 'Qué gif de porquería.'),
(2,'5364668726146715938', 'aabh1', 'Qué gif de porquería.'),
(3,'5364668726146715938', 'aabh1', 'Qué gif de porquería.'),
(1,'6079604226118308780', 'AsfG8', 'Hermoso gif.')


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