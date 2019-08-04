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

-- create medical record table
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
('818-77-5491', 132, 6, '1982-08-13'),
('849-50-0746', 220, 6.2, '1982-08-13'),
('617-87-2587', 145, 6, '1982-08-13'),
('528-90-9719', 138, 6, '1982-08-13');

-- create users table for login
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

