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
  [dateCreated] date not null,
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

--INSERT INTO [User]
--			([firebaseId],
--			[name],
--			[isSeller],
--			[dateCreated],
--			[email],
--			[image])
--		VALUES
--			('aaaaaaaaa', 'Harry Palmer', 1, 'hpalmer@mail.com', null),
--			('bbbbbbbb', 'Gudina Khan', 1, 'gkhan@mail.com', null),
--			('cccccccccc', 'Andreas Arya', 1, 'aarya@mail.com', null),
--			('dddddddddddd', 'Elisabet Mohan', 1, 'emohan@mail.com', null),
--			('eeeeeeeeeee', 'Dwain Roger', 1, 'droger@mail.com', null),
--			('fffffffff', 'Rahman Blaan', 1, 'rblaan@mail.com', null),
--			('gggggggggg', 'Censu Berhta', 1, 'cberhta@mail.com', null),
--			('hhhhhhhhhhhhh', 'Lidia Stefka', 0, 'lstefka@mail.com', null),
--			('iiiiiiiiiiii', 'Shukriya Kusuma', 0, 'skusuma@mail.com', null),
--			('jjjjjjjjjjjjj', 'Diadumenian Hanis', 0, 'dhanis@mail.com', null),
--			('kkkkkkkkk', 'Fedlimid Aybek', 0, 'faybek@mail.com', null),
--			('lllllllllll', 'Matylda Ralf', 0, 'mralf@mail.com', null),
--			('mmmmmmmmmmmmm', 'Taisiya Karsten', 0, 'tkarsten@mail.com', null),
--			('nnnnnnnnnnnn', 'Gisila Finnguala', 0, 'gfinnguala@mail.com', null),
--			('ooooooooooo', 'Philandros Ela', 0, 'pela@mail.com', null),
--			('pppppppppp', 'Brittany Jaron', 0, 'bjaron@mail.com', null),
--			('qqqqqqqqq', 'Bia Melker', 0, 'bmelker@mail.com', null),
--			('rrrrrrrrrrr', 'Kali Sawyer', 0, 'ksawyer@mail.com', null),
--			('sssssssssss', 'Calvus Graciano', 0, 'cgraciano@mail.com', null),
--			('ttttttttttt', 'Atallah Seoc', 0, 'aseoc@mail.com', null)
--GO

INSERT INTO [Category]
            ([id],
             [name],)
        VALUES
            (1 , 'Candle')
GO

INSERT INTO [Item]
            ([id],
             [categoryId],
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
            (1 , 10 , '12oz lemon-lime refresher', 26),
GO

           