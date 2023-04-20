USE [master]
GO
IF db_id('BurnHub') IS NULL
  CREATE DATABASE [BurnHub]
GO
USE [BurnHub]
GO

DROP TABLE IF EXISTS [OrderItem];
DROP TABLE IF EXISTS [ItemOption];
DROP TABLE IF EXISTS [Favorite];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Option];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS [Store];
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
  [id] int PRIMARY KEY identity,
  [name] nvarchar(255) not null,
  [isSeller] bit not null,
  [dateCreated] datetime not null,
  [email] nvarchar(255) not null,
  [firebaseId] nvarchar(255),
  [image] nvarchar(255)
)
GO

CREATE TABLE [Item] (
  [id] int PRIMARY KEY identity,
  [categoryId] int not null,
  [storeId] int not null,
  [description] nvarchar(255),
  [price] int not null
)
GO

CREATE TABLE [Category] (
  [id] int PRIMARY KEY identity,
  [name] nvarchar(255) not null
)
GO

CREATE TABLE [Option] (
  [id] int PRIMARY KEY identity,
  [attribute] nvarchar(255) not null
)
GO

CREATE TABLE [ItemOption] (
  [id] int PRIMARY KEY identity,
  [optionId] int not null,
  [itemId] int not null
)
GO

CREATE TABLE [Favorite] (
  [id] int PRIMARY KEY identity,
  [itemId] int not null,
  [userId] int not null
)
GO

CREATE TABLE [Order] (
  [id] int PRIMARY KEY identity,
  [userId] int not null,
  [dateCreated] datetime not null,
  [dateComplete] datetime
)
GO

CREATE TABLE [Store] (
  [id] int PRIMARY KEY identity,
  [userId] int UNIQUE not null,
  [dateCreated] datetime not null,
  [name] nvarchar(255) not null
)
GO

CREATE TABLE [OrderItem] (
  [id] int PRIMARY KEY identity,
  [orderId] int not null,
  [itemId] int not null
)
GO

ALTER TABLE [favorite] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [store] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [item] ADD FOREIGN KEY ([categoryId]) REFERENCES [category] ([id])
GO

ALTER TABLE [order] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [favorite] ADD FOREIGN KEY ([itemId]) REFERENCES [item] ([id])
GO

ALTER TABLE [item] ADD FOREIGN KEY ([storeId]) REFERENCES [store] ([id])
GO

ALTER TABLE [orderItem] ADD FOREIGN KEY ([orderId]) REFERENCES [order] ([id])
GO

ALTER TABLE [orderItem] ADD FOREIGN KEY ([itemId]) REFERENCES [item] ([id])
GO

ALTER TABLE [itemOption] ADD FOREIGN KEY ([optionId]) REFERENCES [option] ([id])
GO

ALTER TABLE [itemOption] ADD FOREIGN KEY ([itemId]) REFERENCES [item] ([id])
GO



--STARTING DATA--



INSERT INTO [User] ([name], isSeller, dateCreated, email, firebaseId)
VALUES
  ('Pandora Ingram','1','2020-12-13T07:25:34.000Z','pandoraingram3424@outlook.edu','GTT14OCG5WS'),
  ('Jacqueline P. Spence','1','2022-09-04T05:26:44.000Z','jacquelinepspence@google.org','XQV20JGY3WQ'),
  ('Fredericka Cortez','1','2019-09-29T12:47:52.000Z','frederickacortez@hotmail.couk','JRK76VWM8OL'),
  ('Amity T. Lester','1','2022-03-05T05:36:18.000Z','amitytlester2252@protonmail.ca','WQQ61QCT5QX'),
  ('Rhiannon N. Rush','1','2023-03-02T06:48:12.000Z','rhiannonnrush7751@outlook.org','GOG85MCJ6HH'),
  ('Hilary W. Brock','1','2022-10-03T09:44:58.000Z','hilarywbrock@hotmail.ca','DUB86HTJ8XU'),
  ('Octavia J. Roy','1','2020-10-12T03:12:09.000Z','octaviajroy3456@aol.com','XRE15RUM2XW'),
  ('Whilemina Wynn','1','2020-08-07T06:07:35.000Z','whileminawynn@protonmail.net','TIO53GTH1GB'),
  ('Nell L. Porter','1','2023-02-23T04:14:38.000Z','nelllporter8763@aol.net','TNW13WEP6NJ'),
  ('TaShya T. Washington','1','2021-12-03T08:01:53.000Z','tashyatwashington@yahoo.ca','VQX66NPE7CH'),
  ('Noel Harding','0','2019-10-21T04:15:08.000Z','noelharding@protonmail.couk','HRR72XHT6TJ'),
  ('Seth Long','0','2018-12-31T05:20:31.000Z','sethlong5296@google.org','PKT77UBX3KT'),
  ('Marsden Powell','0','2018-04-27T07:34:01.000Z','marsdenpowell2415@protonmail.com','EBV10POP0UD'),
  ('Curran Becker','0','2019-09-08T10:06:17.000Z','curranbecker3800@google.ca','YLE87LBW7MI'),
  ('Aline R. Farrell','0','2020-01-01T05:36:50.000Z','alinerfarrell175@icloud.couk','LVI69MYY4VI'),
  ('Tasha Raymond','0','2019-12-01T05:45:38.000Z','tasharaymond@hotmail.com','TCY58EEM5PT'),
  ('Arthur Castro','0','2019-01-01T10:17:03.000Z','arthurcastro@yahoo.couk','TPL41WYP0PV'),
  ('Francis Marquez','0','2022-11-17T10:54:26.000Z','francismarquez9825@aol.com','BWK51LNU1GW'),
  ('Selma Harmon','0','2021-06-26T04:11:22.000Z','selmaharmon@yahoo.net','KSW28WUZ0OR'),
  ('Aline R. Farrell','0','2020-01-01T05:36:50.000Z','alinerfarrell175@icloud.couk','LVI69MYY4VI'),
  ('Tasha Raymond','0','2019-12-01T05:45:38.000Z','tasharaymond@hotmail.com','TCY58EEM5PT'),
  ('Arthur Castro','0','2019-01-01T10:17:03.000Z','arthurcastro@yahoo.couk','TPL41WYP0PV'),
  ('Francis Marquez','0','2022-11-17T10:54:26.000Z','francismarquez9825@aol.com','BWK51LNU1GW'),
  ('Selma Harmon','0','2021-06-26T04:11:22.000Z','selmaharmon@yahoo.net','KSW28WUZ0OR'),
  ('Brady Fischer','0','2017-11-10T03:17:59.000Z','bradyfischer9648@google.couk','ZLL88PBZ5LO'),
  ('Emily Valentine','0','2018-01-31T05:34:29.000Z','emilyvalentine7949@aol.edu','IEQ95EZL1FE'),
  ('Calista M. Briggs','0','2022-02-18T07:48:23.000Z','calistambriggs@icloud.couk','FLD12GKG6YJ'),
  ('Rigel Mcfadden','0','2018-12-24T09:55:27.000Z','rigelmcfadden1276@protonmail.org','JYX76VRD2DB'),
  ('Francis U. Kim','0','2017-12-01T03:11:28.000Z','francisukim8558@outlook.org','DGQ68BUX2IQ'),
  ('Malcolm Mckenzie','0','2020-06-12T11:27:42.000Z','malcolmmckenzie7192@google.edu','ECK26IQX7NM'),
  ('Henry Sharpe','0','2022-07-24T09:19:29.000Z','henrysharpe2731@hotmail.ca','GBF24NRO9OY'),
  ('Veda T. Kirkland','0','2019-09-18T07:33:21.000Z','vedatkirkland@aol.net','HYL63FTX4EY'),
  ('Zachery Q. Meadows','0','2022-08-11T07:39:22.000Z','zacheryqmeadows2537@google.org','KEQ84ISZ4SP'),
  ('Leah Bird','0','2021-07-12T02:06:32.000Z','leahbird3787@outlook.couk','OMS84BUC1GR'),
  ('Neil Odom','0','2020-11-03T01:07:56.000Z','neilodom@google.org','WGJ29YBV9UK'),
  ('Echo Jordan','0','2022-08-14T01:50:37.000Z','echojordan@outlook.com','CJL86DFI5PP'),
  ('Nicole J. Kim','0','2019-08-22T12:44:21.000Z','nicolejkim@outlook.edu','ETX21VJP1EX'),
  ('Graham Berry','0','2021-06-06T08:12:27.000Z','grahamberry6356@yahoo.com','FPO36UHU2CN'),
  ('Chancellor E. Gillespie','0','2018-03-30T03:03:32.000Z','chancelloregillespie@google.edu','JEI86PTX1JO'),
  ('Garrison Melton','0','2017-11-28T08:55:52.000Z','garrisonmelton@aol.edu','QZC71DPK3ZY')
GO

INSERT INTO [Store]
			([userId],
			[dateCreated],
			[name])
		VALUES
			(1, '2020-06-22 04:04:13.413', 'Bee Calm'),
			(2, '2019-06-13 10:38:48.020', 'Vegan Bouquet'),
			(3, '2022-02-24 14:57:03.100', 'Soy Flamingo'),
			(4, '2021-08-16 16:44:17.180', 'Thyme to Unwind'),
			(5, '2022-07-22 08:39:28.780', 'Flaming Candle Co.'),
			(6, '2018-03-17 13:48:07.200', 'Busy Beeswax Candles'),
			(7, '2020-08-24 17:33:37.307', 'Fabulous Flame'),
			(8, '2022-03-11 18:21:08.090', 'Candle Carvers'),
			(9, '2020-03-07 11:16:45.682', 'Happy Candle Collective'),
			(10, '2019-07-11 10:18:47.613', 'Smoked Scents')
GO

INSERT INTO [Category]
            ([name])
        VALUES
            ('Candle')
GO

INSERT INTO [Item]
            ([categoryId],
             [storeId],
             [description],
             [price])
        VALUES
            (1 , 1 , 'Pale Blue Soy based candle with wood wick', 10),
            (1 , 1 , 'Pink Soy based candle with wick', 20),
            (1 , 2 , 'The Ocean Breeze slaps you in the face', 25),
            (1 , 2 , 'Be prepared to be bull dozed by the fragrant aroma of an orange grove', 20),
            (1 , 3 , 'Fancy AF with gold flakes make you feel like royalty', 1300),
            (1 , 3 , 'Treat yo self', 1000),
            (1 , 4 , 'its a small fire object', 5),
            (1 , 4 , 'indoor fire with nice smell', 5),
            (1 , 5 , 'Soy with slow burn wick and smells like summer', 11),
            (1 , 5 , 'Soy with slow burn wick and smells like winter', 12),
            (1 , 6 , 'French vanilla candle', 15),
            (1 , 6 , 'Apple candle', 16),
            (1 , 7 , '200hr burn time with the smell of roses', 40),
            (1 , 7 , '500hr burn time with the smell of fresh laundry', 60),
            (1 , 8 , null, 12),
            (1 , 8 , null, 14),
            (1 , 9 , 'peach truck summer day in mason jar', 20),
            (1 , 9 , 'wild flower walk in the sun in large mason jar', 35),
            (1 , 10 , '10oz mint green refresher', 18),
            (1 , 10 , '12oz lemon-lime refresher', 26)
GO         

INSERT INTO [Option]
			([attribute])
		VALUES
			('Pumpkin'),
			('Vanilla'),
			('Citrus'),
			('Coconut'),
			('Gardenia'),
			('Lavender'),
			('Lemon'),
			('Cinnamon'),
			('Rose'),
			('Peppermint'),
			('Jasmine'),
			('Sandalwood'),
			('Butter Cream'),
			('Salted Caramel'),
			('Cottage Breeze'),
			('Autumn Leaves'),
			('Spiced Pumpkin'),
			('Vineyard'),
			('Macintosh'),
			('Christmas Cookie')
Go

INSERT INTO [Order]
			([userId],
			[dateCreated],
			[dateComplete])
		VALUES
			(1, '2022-10-20 13:05:23', '2022-10-21 08:32:19'),
			(1, '2023-02-05 19:17:54', NULL),
			(3, '2022-12-11 09:23:47', '2022-12-12 14:09:36'),
			(3, '2023-01-28 16:55:08', NULL),
			(4, '2022-11-03 11:42:12', '2022-11-04 20:17:29'),
			(5, '2022-09-08 07:38:27', '2022-09-09 12:18:05'),
			(6, '2023-03-01 22:19:13', NULL),
			(7, '2022-11-30 18:27:41', '2022-12-01 08:56:17'),
			(8, '2022-08-25 15:49:09', NULL),
			(9, '2023-03-18 12:36:37', '2023-03-19 09:45:22'),
			(10, '2023-03-25 12:34:56', NULL),
			(10, '2023-03-26 08:15:43', '2023-04-02 15:24:36'),
			(11, '2023-03-27 16:37:59', '2023-03-27 18:23:45'),
			(11, '2023-03-28 09:26:42', NULL),
			(12, '2023-01-02 19:45:32', NULL),
			(12, '2023-03-02 15:27:34', '2023-03-05 10:23:42'),
			(13, '2023-03-03 11:32:45', NULL),
			(13, '2023-03-09 10:15:23', '2023-03-13 08:36:45'),
			(14, '2023-03-12 16:45:37', NULL),
			(15, '2023-01-05 13:27:42', NULL)
GO

INSERT INTO [OrderItem]
			([orderId],
			[itemId])
		VALUES
			(1,15),
			(1,2),
			(2,10),
			(2,3),
			(3,5),
			(3,16),
			(4,12),
			(4,2),
			(4,2),
			(4,2),
			(4,3),
			(5,2),
			(5,2),
			(5,10),
			(6,10),
			(6,15),
			(6,15),
			(7,18),
			(7,18),
			(7,20),
			(8,20),
			(8,20),
			(8,10),
			(9,5),
			(9,5),
			(9,3),
			(10,1),
			(11,2),
			(12,9),
			(13,5),
			(14,10),
			(15,15),
			(16,18),
			(17,5),
			(18,2),
			(19,5),
			(20,10)
GO