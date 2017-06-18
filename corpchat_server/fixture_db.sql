-- create user corpchat with password '100';
-- create database corpchat with owner  corpchat;
-- alter database owner to corpchat;
-- grant all privileges on corpchat to corpchat;

delete from user_user;
delete from user_department;
alter sequence user_department_id_seq restart;


insert into user_department (name) values ('department_1');
insert into user_department (name) values ('department_2');
insert into user_department (name) values ('department_3');

insert into user_user (login, password, name, surname, email, department_id)
      values ('user1', '1', 'Tom', 'Soer', 'Tom@mail.com', 1);

insert into user_user (login, password, name, surname, email, department_id)
        values ('user2', '1', 'Ann', 'Soer', 'Ann@mail.com', 2);

insert into user_user (login, password, name, surname, email, department_id)
        values ('user3', '1', 'Frank', 'Crack', 'Frank@mail.com', 3);

insert into user_user (login, password, name, surname, email, department_id)
        values ('user4', '1', 'Michael', 'Vermitz', 'Michael@mail.com', 1);
