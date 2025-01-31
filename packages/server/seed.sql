CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE custom_gif 
ALTER COLUMN gif_id SET DEFAULT ('giffy-' || uuid_generate_v4());


-- USER 1
INSERT INTO "user" (user_id, user_name, password, avatar)
VALUES ('1', 'peparda', '8887', 'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg');