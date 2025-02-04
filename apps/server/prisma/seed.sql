-- Habilitar extension para generar UUID en la base de datos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom uuid
ALTER TABLE gif 
ALTER COLUMN id SET DEFAULT ('giffy-' || uuid_generate_v4());

-- Users
INSERT INTO "user" (user_id, user_name, password, avatar)
VALUES ('1', 'Frieren', '1234', 'https://media1.tenor.com/m/hmRj_HEjBz8AAAAd/anime-frieren.gif'),
       ('2', 'Goku', '4321', 'https://media1.tenor.com/m/RzSPDIqkgoIAAAAC/goku-dragon-ball-z.gif');

