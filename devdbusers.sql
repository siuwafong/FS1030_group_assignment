-- please run this for dev setup; 
-- this will help even if we pass along .env files to each other( devs of this project)
-- create user
create user nodeuser@localhost identified by 'nodeuser@1234';
-- grant pall privileges on all db
GRANT ALL PRIVILEGES ON *.* TO 'nodeuser'@'localhost';
-- set password
ALTER USER 'nodeuser'@localhost IDENTIFIED WITH mysql_native_password BY 'nodeuser@1234';
FLUSH PRIVILEGES;