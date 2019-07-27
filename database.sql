CREATE TABLE IF NOT EXISTS `patients1` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` mediumtext NOT NULL,
  `last_name` mediumtext NOT NULL,
  `health_card_number` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `genre` tinytext NOT NULL,
  `address` mediumtext NOT NULL,
  `phone` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


INSERT INTO 
patients1 (first_name, last_name, health_card_number, dob, genre, address, phone)
VALUES 
('Phillip','Starck','0987654321', '1978-09-18','M','120 Long Island Road','4374444223'),
('John','Doe','0123456789','1983-07-11','M','120 Happy Road','4374444223');



CREATE TABLE IF NOT EXISTS `users1` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `super_user` boolean,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;