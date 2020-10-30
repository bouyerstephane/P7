CREATE USER 'client'@'localhost' IDENTIFIED WITH mysql_native_password BY 'vcmpvcmp';
GRANT ALL PRIVILEGES ON p7.* TO 'client'@'localhost';

SET NAMES utf8;

CREATE TABLE users(
userId INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
pseudo VARCHAR(20) NOT NULL UNIQUE,
email VARCHAR(30) NOT NULL UNIQUE,
password CHAR(60) NOT NULL,
isAdmin TINYINT NOT NULL DEFAULT 0,
PRIMARY KEY (userId)
)
ENGINE=INNODB;


INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (1,'admin','admin','admin','admin@gmail.fr','$2b$10$A3BVXeP.GCFVrzWxpiXwWuinf6PoyT5AADawZnoRLkmUQQMDxvumu',1);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (51,'Leanne','Graham','Bret','Sincere@april.biz','$2b$10$2rTx8hbo5mzgNj6g47e8keBMQb03MZghmdzqSsa0xOnJOl771JzHm',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (52,'Ervin','Howell','Antonette','Shanna@melissa.tv','$2b$10$JwuB7AHQXfQr7bR.LGDNqOGBrZnZybaSaarKcy9a8H5EulZmPKFam',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (53,'Clementine','Bauch','Samantha','Nathan@yesenia.net','$2b$10$UXjW6PvhdUSY5FKU802lb.GMzNCeOgC2SKfTmNcVyV49JQT.5F/92',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (56,'Patricia','Lebsack','Karianne','Julianne.OConner@kory.org','$2b$10$Nnyas4TusBczN6l3.ixII.7hAj2YqKoDG.ngdGO4XqW.kQtRTU5AS',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (57,'Chelsey','Dietrich','Kamren','Lucio_Hettinger@annie.ca','$2b$10$xeWtK0WhYgVV1Pi7xxVJH.VXTTwtayFiu2qNfY8jvcg2RFbSmZ6xG',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (58,'Dennis','Schulist','Leopoldo_Corkery','Karley_Dach@jasper.info','$2b$10$LTNHeqaicUtKjWBKkEyLiuGV8bOdr1/KWVrDSJxhry56IkSkQfS16',0);
INSERT INTO `users` (`userId`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (66,'john','doe','DoeDoe','john.doe@gmail.fr','$2b$10$/BguoZnIVb5nhZ7hGE90yuxemXeFg23hBEpBH5sxBJjHvQqwrsTYe',0);

CREATE TABLE forum(
postId INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
userId INT UNSIGNED NOT NULL,
post VARCHAR(500) NOT NULL,
date DATETIME NOT NULL,
lastModif DATETIME DEFAULT NULL,
PRIMARY KEY (postId)
)
ENGINE=INNODB;

INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (9,51,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-29 18:19:31',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (10,51,'ma modification de post','2020-10-29 18:19:37','2020-10-30 05:04:51');
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (11,52,'du blablabla de modification ','2020-10-29 18:19:47','2020-10-29 22:14:44');
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (12,52,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-29 22:45:13',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (15,66,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:10:48',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (16,66,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:10:50',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (17,66,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:10:51',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (18,66,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:10:51',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (20,66,'ma modification de post','2020-10-30 05:10:53','2020-10-30 05:15:10');
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (21,58,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:11:17',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (22,58,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:11:18',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (23,58,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:11:18',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (24,58,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:11:19',NULL);
INSERT INTO `forum` (`postId`,`userId`,`post`,`date`,`lastModif`) VALUES (25,58,'3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla','2020-10-30 05:11:19',NULL);

CREATE TABLE forum_commentary(
commentaryId INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
postId INT UNSIGNED NOT NULL,
userId INT UNSIGNED NOT NULL,
commentary varchar(500) NOT NULL,
date DATETIME NOT NULL,
lastModif DATETIME DEFAULT NULL,
PRIMARY KEY (commentaryId),
CONSTRAINT `fk_postId`
  FOREIGN KEY (`postId`)
  REFERENCES `p7`.`forum` (`postId`)
  ON DELETE CASCADE
)ENGINE=INNODB;

INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (4,10,51,'mon commentaire super! ','2020-10-29 18:25:19',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (5,10,51,'mon deuxième commentaire super! ','2020-10-29 18:26:36',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (7,10,51,'Ma super modification de commentaire','2020-10-29 18:33:43','2020-10-30 05:08:54');
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (21,25,66,'mon commentaire super! ','2020-10-30 05:12:04',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (22,25,66,'mon commentaire super! ','2020-10-30 05:12:07',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (23,25,66,'mon commentaire super! ','2020-10-30 05:12:07',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (24,25,66,'Ma super modification de commentaire','2020-10-30 05:12:08','2020-10-30 05:15:34');
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (25,24,66,'mon commentaire super! ','2020-10-30 05:16:41',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (26,24,66,'mon commentaire super! ','2020-10-30 05:16:42',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (27,24,66,'mon commentaire super! ','2020-10-30 05:16:43',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (28,24,66,'mon commentaire super! ','2020-10-30 05:16:44',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (29,23,66,'mon commentaire super! ','2020-10-30 05:16:49',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (30,23,66,'mon commentaire super! ','2020-10-30 05:16:50',NULL);
INSERT INTO `forum_commentary` (`commentaryId`,`postId`,`userId`,`commentary`,`date`,`lastModif`) VALUES (31,23,66,'mon commentaire super! ','2020-10-30 05:16:50',NULL);
