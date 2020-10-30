CREATE USER 'client'@'localhost' IDENTIFIED WITH mysql_native_password BY 'vcmpvcmp';
GRANT ALL PRIVILEGES ON p7.* TO 'client'@'localhost';

SET NAMES utf8;

CREATE TABLE users(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
pseudo VARCHAR(20) NOT NULL UNIQUE,
email VARCHAR(30) NOT NULL UNIQUE,
password CHAR(60) NOT NULL,
isAdmin TINYINT,
PRIMARY KEY (id)
)
ENGINE=INNODB;


INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (1,'admin','admin','admin','admin@gmail.fr','$2b$10$A3BVXeP.GCFVrzWxpiXwWuinf6PoyT5AADawZnoRLkmUQQMDxvumu',1);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (51,'Leanne','Graham','Bret','Sincere@april.biz','$2b$10$2rTx8hbo5mzgNj6g47e8keBMQb03MZghmdzqSsa0xOnJOl771JzHm',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (52,'Ervin','Howell','Antonette','Shanna@melissa.tv','$2b$10$JwuB7AHQXfQr7bR.LGDNqOGBrZnZybaSaarKcy9a8H5EulZmPKFam',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (53,'Clementine','Bauch','Samantha','Nathan@yesenia.net','$2b$10$UXjW6PvhdUSY5FKU802lb.GMzNCeOgC2SKfTmNcVyV49JQT.5F/92',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (56,'Patricia','Lebsack','Karianne','Julianne.OConner@kory.org','$2b$10$Nnyas4TusBczN6l3.ixII.7hAj2YqKoDG.ngdGO4XqW.kQtRTU5AS',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (57,'Chelsey','Dietrich','Kamren','Lucio_Hettinger@annie.ca','$2b$10$xeWtK0WhYgVV1Pi7xxVJH.VXTTwtayFiu2qNfY8jvcg2RFbSmZ6xG',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (58,'Dennis','Schulist','Leopoldo_Corkery','Karley_Dach@jasper.info','$2b$10$LTNHeqaicUtKjWBKkEyLiuGV8bOdr1/KWVrDSJxhry56IkSkQfS16',0);
INSERT INTO `users` (`id`,`firstName`,`lastName`,`pseudo`,`email`,`password`,`isAdmin`) VALUES (63,'john','doe','DoeDoe','john.doe@gmail.fr','$2b$10$c1s9yjucWeQ0CNqZqF16J.9NMmEfdeUbI1WjcCM8g98z7YzYvK4X.',0);
