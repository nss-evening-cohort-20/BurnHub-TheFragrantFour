USE [master]
GO
IF db_id('BurnHub') IS NULL
  CREATE DATABASE [BurnHub]
GO
USE [BurnHub]
GO

DROP TABLE IF EXISTS [CartItem];
DROP TABLE IF EXISTS [Favorite];
DROP TABLE IF EXISTS [Candle];
DROP TABLE IF EXISTS [Scent];
DROP TABLE IF EXISTS [Cart];
DROP TABLE IF EXISTS [Store];
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
  [id] int PRIMARY KEY identity,
  [FirebaseUid] nvarchar(255) not null,
  [name] nvarchar(255) not null,
  [isSeller] bit not null,
  [email] nvarchar(255) not null,
  [image] nvarchar(255)
)
GO

CREATE TABLE [Candle] (
  [id] int PRIMARY KEY identity,
  [scentId] int,
  [storeId] int not null,
  [description] nvarchar(255),
  [price] int not null
)
GO

CREATE TABLE [Scent] (
  [id] int PRIMARY KEY identity,
  [name] nvarchar(255) not null
)
GO

CREATE TABLE [Favorite] (
  [id] int PRIMARY KEY identity,
  [candleId] int not null,
  [userId] int not null
)
GO

CREATE TABLE [Cart] (
  [id] int PRIMARY KEY identity,
  [userId] int not null
)
GO

CREATE TABLE [Store] (
  [id] int PRIMARY KEY identity,
  [userId] int not null,
  [name] nvarchar(255) not null
)
GO

CREATE TABLE [CartItem] (
  [id] int PRIMARY KEY identity,
  [cartId] int not null,
  [candleId] int not null
)
GO

ALTER TABLE [cart] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [favorite] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [store] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [candle] ADD FOREIGN KEY ([storeId]) REFERENCES [store] ([id])
GO

ALTER TABLE [cartItem] ADD FOREIGN KEY ([cartId]) REFERENCES [cart] ([id])
GO

ALTER TABLE [candle] ADD FOREIGN KEY ([scentId]) REFERENCES [scent] ([id])
GO

ALTER TABLE [favorite] ADD FOREIGN KEY ([candleId]) REFERENCES [candle] ([id])
GO

ALTER TABLE [cartItem] ADD FOREIGN KEY ([candleId]) REFERENCES [candle] ([id])
GO



--STARTING DATA--

INSERT INTO [User]
			([FirebaseUid],
			[Name],
			[isSeller],
			[email],
			[image])
		VALUES
			('aaaaaaaaa', 'Harry Palmer', 1, 'hpalmer@mail.com', null),
			('bbbbbbbb', 'Gudina Khan', 1, 'gkhan@mail.com', null),
			('cccccccccc', 'Andreas Arya', 1, 'aarya@mail.com', null),
			('dddddddddddd', 'Elisabet Mohan', 1, 'emohan@mail.com', null),
			('eeeeeeeeeee', 'Dwain Roger', 1, 'droger@mail.com', null),
			('fffffffff', 'Rahman Blaan', 1, 'rblaan@mail.com', null),
			('gggggggggg', 'Censu Berhta', 1, 'cberhta@mail.com', null),
			('hhhhhhhhhhhhh', 'Lidia Stefka', 0, 'lstefka@mail.com', null),
			('iiiiiiiiiiii', 'Shukriya Kusuma', 0, 'skusuma@mail.com', null),
			('jjjjjjjjjjjjj', 'Diadumenian Hanis', 0, 'dhanis@mail.com', null),
			('kkkkkkkkk', 'Fedlimid Aybek', 0, 'faybek@mail.com', null),
			('lllllllllll', 'Matylda Ralf', 0, 'mralf@mail.com', null),
			('mmmmmmmmmmmmm', 'Taisiya Karsten', 0, 'tkarsten@mail.com', null),
			('nnnnnnnnnnnn', 'Gisila Finnguala', 0, 'gfinnguala@mail.com', null),
			('ooooooooooo', 'Philandros Ela', 0, 'pela@mail.com', null),
			('pppppppppp', 'Brittany Jaron', 0, 'bjaron@mail.com', null),
			('qqqqqqqqq', 'Bia Melker', 0, 'bmelker@mail.com', null),
			('rrrrrrrrrrr', 'Kali Sawyer', 0, 'ksawyer@mail.com', null),
			('sssssssssss', 'Calvus Graciano', 0, 'cgraciano@mail.com', null),
			('ttttttttttt', 'Atallah Seoc', 0, 'aseoc@mail.com', null)
GO