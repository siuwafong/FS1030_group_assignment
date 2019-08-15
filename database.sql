CREATE DATABASE IF NOT EXISTS fs1030;
USE fs1030;

-- create patients table
CREATE TABLE IF NOT EXISTS `patients` (
 -- `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` mediumtext NOT NULL,
  `last_name` mediumtext NOT NULL,
  `health_card_number` varchar(11) NOT NULL,
  `dob` date NOT NULL,
  `gender` tinytext NOT NULL,
  `email` mediumtext NOT NULL,
  `address` mediumtext NOT NULL,
  `phone` varchar(13) NOT NULL,
  PRIMARY KEY (`health_card_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

SELECT CONCAT(first_name, " ", last_name)  FROM patients WHERE health_card_number = "818-77-5491";


insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Sara-ann', 'Featherbie', '818-77-5491', '1958-08-05', 'Female', 'sfeatherbie0@photobucket.com', '3796 Rutledge Center', '(496) 6490315');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Theobald', 'Jikovsky', '849-50-0746', '1939-03-20', 'Male', 'tjikovsky1@godaddy.com', '691 Moulton Terrace', '(268) 4603304');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Cooper', 'Yakunkin', '617-87-2587', '1983-06-24', 'Male', 'cyakunkin2@networksolutions.com', '02 Esch Terrace', '(644) 9339419');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Charlotte', 'Lisciandro', '528-90-9719', '1994-11-15', 'Female', 'clisciandro3@ustream.tv', '92 Nancy Street', '(707) 5474108');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Priscilla', 'Boarder', '766-53-8004', '1976-10-03', 'Female', 'pboarder4@booking.com', '3 Florence Alley', '(820) 3989200');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Fleming', 'Trengove', '256-96-2761', '1997-09-01', 'Male', 'ftrengove5@g.co', '5109 Fulton Terrace', '(858) 4532344');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Martynne', 'Espley', '818-73-2205', '1997-08-02', 'Female', 'mespley6@prnewswire.com', '293 Crescent Oaks Drive', '(669) 5589979');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Ravid', 'Rylatt', '667-23-6487', '1933-03-17', 'Male', 'rrylatt7@smh.com.au', '3964 Sherman Way', '(415) 9487485');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Bibi', 'Hurch', '670-98-2492', '1940-06-28', 'Female', 'bhurch8@netscape.com', '52 Farragut Point', '(677) 9732081');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Dalli', 'Dougharty', '294-77-3615', '1936-10-31', 'Male', 'ddougharty9@ucla.edu', '00478 John Wall Avenue', '(939) 6146299');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Stillmann', 'Pardue', '140-42-9732', '1962-03-07', 'Male', 'sparduea@hao123.com', '906 Granby Point', '(369) 9142131');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Weylin', 'Redmore', '348-55-3019', '1946-01-10', 'Male', 'wredmoreb@tiny.cc', '5554 Swallow Plaza', '(369) 4047358');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Laryssa', 'Pemberton', '629-20-4781', '1962-08-17', 'Female', 'lpembertonc@printfriendly.com', '53 Daystar Lane', '(535) 2840992');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Alta', 'Metcalf', '252-95-5188', '1987-07-01', 'Female', 'ametcalfd@ftc.gov', '90478 Summit Terrace', '(512) 3538133');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Tabor', 'Hauch', '323-19-6759', '1948-07-07', 'Male', 'thauche@dot.gov', '8 Melody Terrace', '(697) 5901438');
insert into patients (first_name, last_name, health_card_number, dob, gender, email, address, phone) values ('Brunhilda', 'Rimmington', '189-87-0156', '1982-08-13', 'Female', 'brimmingtonf@intel.com', '138 Loftsgordon Street', '(575) 3054297');

-- create patients table
CREATE TABLE IF NOT EXISTS `practicians` (
 -- `id` int(5) NOT NULL AUTO_INCREMENT,
 `username` varchar(20) NOT NULL,
 `first_name` varchar(20) NOT NULL,
 `last_name` varchar(20) NOT NULL,
 `city` mediumtext NOT NULL,
 `email` mediumtext NOT NULL,
 `phone` varchar(13) NOT NULL,
 PRIMARY KEY (`username`),
 INDEX (`first_name`),
 INDEX (`last_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

insert into practicians (username, first_name, last_name, city, email, phone) values ('sfeatherbie', 'Sarah', 'Featherbie', 'Hamilton', 'sfeatherbie@me.com', '(535) 2840992');
insert into practicians (username, first_name, last_name, city, email, phone) values ('smackenzie', 'Steve', 'Mackenzie', 'North York', 'smackenzie@me.com', '(647) 2840992');

-- create vitals table
 CREATE TABLE IF NOT EXISTS `vitals` (
  -- `id` int(5) NOT NULL AUTO_INCREMENT,
  `health_card_number` varchar(11) NOT NULL,
  `body_weight` varchar(20) NOT NULL,
	`body_height` varchar(20) NOT NULL,
	`record_date` DATE NOT NULL,
  PRIMARY KEY (`health_card_number`),
  FOREIGN KEY (`health_card_number`) REFERENCES patients(`health_card_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO
vitals (health_card_number, body_weight, body_height, record_date)
VALUES
('818-77-5491', 132, 6, '2018-04-13'),
('849-50-0746', 220, 6.2, '2019-08-13'),
('617-87-2587', 145, 6, '2019-08-13'),
('528-90-9719', 138, 6, '2018-08-13');

-- create immunology table
 CREATE TABLE IF NOT EXISTS `immunology` (
  -- `id` int(5) NOT NULL AUTO_INCREMENT,
  `health_card_number` varchar(11) NOT NULL,
  `immunology_type` varchar(20) NOT NULL,
  `doses` INT(2) NOT NULL,
  `record_date` DATE NOT NULL,
  PRIMARY KEY (`health_card_number`, `immunology_type`, `record_date`),
  FOREIGN KEY (`health_card_number`) REFERENCES patients(`health_card_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO
immunology (health_card_number, immunology_type, doses, record_date)
VALUES
('818-77-5491', 'Measles', 2, '1986-08-13'),
('849-50-0746', 'Pertussis', 1, '1990-08-13'),
('849-50-0746', 'Diphteria', 1, '1990-08-13'),
('617-87-2587', 'Polio', 2, '2000-08-13'),
('528-90-9719', 'Diphteria', 1, '1986-08-13');

-- create history_exam table
 CREATE TABLE IF NOT EXISTS `history_visit` (
  -- `id` int(5) NOT NULL AUTO_INCREMENT,
  `health_card_number` varchar(11) NOT NULL,
  `visit_date` DATE NOT NULL,
	`practician_first_name` varchar(20) NOT NULL,
  `practician_last_name` varchar(20) NOT NULL,
	`note` longtext,
  PRIMARY KEY (`health_card_number`, `visit_date`),
  FOREIGN KEY (`health_card_number`) REFERENCES patients(`health_card_number`),
	FOREIGN KEY (`practician_first_name`) REFERENCES practicians(`first_name`),
	FOREIGN KEY (`practician_last_name`) REFERENCES practicians(`last_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO
history_visit (health_card_number, visit_date, practician_first_name, practician_last_name, note)
VALUES
('818-77-5491', '2018-04-13', 'Sarah', 'Featherbie', 'Check-up. Nothing to report.'),
('849-50-0746', '2019-08-13', 'Steve', 'Mackenzie', NULL),
('849-50-0746', '2019-05-13', 'Steve', 'Mackenzie', 'Routine follow up. Patient complains about stomach pain. Overweight to report.  Sub optimal sugar, control with retinopathy and neuropathy, high glucometer readings. Will work harder on diet. Will increase insulin by 2 units.');

-- create users table for login
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

SELECT * FROM `patients` INNER JOIN history_visit ON patients.health_card_number  = history_visit.health_card_number WHERE patients.health_card_number LIKE '%818-77-5491%' ORDER BY history_visit.visit_date DESC