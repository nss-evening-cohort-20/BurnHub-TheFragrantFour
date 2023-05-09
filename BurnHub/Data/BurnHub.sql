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
  [name] nvarchar(255) not null,
  [categoryId] int not null,
  [storeId] int not null,
  [quantity] int not null,
  [description] nvarchar(255),
  [price] int not null,
  [image] nvarchar(255)
)
GO
CREATE TABLE [Category] (
  [id] int PRIMARY KEY identity,
  [name] nvarchar(255) not null,
  [image] nvarchar(255)
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
  [name] nvarchar(255) not null,
  [profileImage] nvarchar(255),
  [coverImage] nvarchar(255)
)
GO
CREATE TABLE [OrderItem] (
  [id] int PRIMARY KEY identity,
  [orderId] int not null,
  [itemId] int not null,
  [itemQuantity] int not null
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
  ('Pandora Ingram','1','2020-12-13T07:25:34.000Z','pandoraingram3424@outlook.edu','m4Kl9WLKeFTYTsLvw4Rpo2gQOXD3'),
  ('Jacqueline P. Spence','1','2022-09-04T05:26:44.000Z','jacquelinepspence@google.org','CUEzzSrMcPcKIsiHBQLAPkUhd4z1'),
  ('Fredericka Cortez','1','2019-09-29T12:47:52.000Z','frederickacortez@hotmail.couk','NhQjw53JVkbxtRH7NAB9oVYR5jB3'),
  ('Amity T. Lester','1','2022-03-05T05:36:18.000Z','amitytlester2252@protonmail.ca','ttZ2DHlqRPPelJrQeXDqO3N1vi22'),
  ('Rhiannon N. Rush','1','2023-03-02T06:48:12.000Z','rhiannonnrush7751@outlook.org','KCJwPZDgNtVP2fi1LumVkrYEJgg1'),
  ('Hilary W. Brock','1','2022-10-03T09:44:58.000Z','hilarywbrock@hotmail.ca','BxtlQyMJtMP3HTCPHZgeZ29XuDx1'),
  ('Octavia J. Roy','1','2020-10-12T03:12:09.000Z','octaviajroy3456@aol.com','kssxTTRhoqQmGT4KzmRcV1N6JFf2'),
  ('Whilemina Wynn','1','2020-08-07T06:07:35.000Z','whileminawynn@protonmail.net','c4tJgFX6zXYDpdAPeJii8t4WHPW2'),
  ('Nell L. Porter','1','2023-02-23T04:14:38.000Z','nelllporter8763@aol.net','LhSga2U3xYWjnlDtesdOHcNyYO72'),
  ('TaShya T. Washington','1','2021-12-03T08:01:53.000Z','tashyatwashington@yahoo.ca','at50ExYBP0htZ2P5MQXI97b53h92'),
  ('Noel Harding','0','2019-10-21T04:15:08.000Z','noelharding@protonmail.couk','cN0OG4nvx7dwrUhPFTvimwC8fkw1'),
  ('Seth Long','0','2018-12-31T05:20:31.000Z','sethlong5296@google.org','H69YNrz5HpbaKAmEWv95xtvfry13'),
  ('Marsden Powell','0','2018-04-27T07:34:01.000Z','marsdenpowell2415@protonmail.com','vc4FpIaVbXWmuHZtpH2H36rcBwq2'),
  ('Curran Becker','0','2019-09-08T10:06:17.000Z','curranbecker3800@google.ca','VMdrpv3SEse0EHccXabNBbgO0y22'),
  ('Aline R. Farrell','0','2020-01-01T05:36:50.000Z','alinerfarrell175@icloud.couk','YR9Lu0CD02hfYsBJ7Z99ydWsbi63'),
  ('Tasha Raymond','0','2019-12-01T05:45:38.000Z','tasharaymond@hotmail.com','Q8icx12eMmR3xhUCOhB28N4wBJB2'),
  ('Arthur Castro','0','2019-01-01T10:17:03.000Z','arthurcastro@yahoo.couk','OfNoBR0smnSqF3WfJdRQGJdJicv1'),
  ('Francis Marquez','0','2022-11-17T10:54:26.000Z','francismarquez9825@aol.com','p52xlohkyIeEJpEyTttcJNH5t222'),
  ('Selma Harmon','0','2021-06-26T04:11:22.000Z','selmaharmon@yahoo.net','v4MJUSUYQcQI4T65fiN8R8JPaFA3'),
  ('Aline R. Farrell','0','2020-01-01T05:36:50.000Z','alinerrfarrell175@icloud.couk','iQJhGP9QZrYflDaAdgTYa8xIQkg1'),
  ('Tasha Raymond','0','2019-12-01T05:45:38.000Z','tasharaymond25@hotmail.com','PEu8ZajJWRYhFm06QmA9Nihoryo1'),
  ('Arthur Castro','0','2019-01-01T10:17:03.000Z','arthurcastro25@yahoo.couk','pDWo5es6BTb1RiHgEo5XMhSs1fe2'),
  ('Francis Marquez','0','2022-11-17T10:54:26.000Z','francismarquez98255@aol.com','UxeoayHqRNQHu0RPVio64xhcMSD2'),
  ('Selma Harmon','0','2021-06-26T04:11:22.000Z','selmaharmon25@yahoo.net','DCzSkknewWMgmRQadWWmwQpMxgd2'),
  ('Brady Fischer','0','2017-11-10T03:17:59.000Z','bradyfischer9648@google.couk','rlUPvFQPLLaXhYVaKe978Ckt37w1'),
  ('Emily Valentine','0','2018-01-31T05:34:29.000Z','emilyvalentine7949@aol.edu','MmiSRR3FZychtI2eXXYUuUEGUzn2'),
  ('Calista M. Briggs','0','2022-02-18T07:48:23.000Z','calistambriggs@icloud.couk','oIMBAdWCB3NOcCgbrHPzLJwZy9A3'),
  ('Rigel Mcfadden','0','2018-12-24T09:55:27.000Z','rigelmcfadden1276@protonmail.org','Zp9ccJ3LquWZUnbjzdJOHG86g382'),
  ('Francis U. Kim','0','2017-12-01T03:11:28.000Z','francisukim8558@outlook.org','Y0zgJAKH8nTlVzOu8FsSScXB6d93'),
  ('Malcolm Mckenzie','0','2020-06-12T11:27:42.000Z','malcolmmckenzie7192@google.edu','dyoofsYWv5feByUehcFn4RfLA9z2'),
  ('Henry Sharpe','0','2022-07-24T09:19:29.000Z','henrysharpe2731@hotmail.ca','Z0yDawntezb4DfMa4m5DmT3gSGI2'),
  ('Veda T. Kirkland','0','2019-09-18T07:33:21.000Z','vedatkirkland@aol.net','4lO3V8f4smRyMghC7Xfj9UQTqn23'),
  ('Zachery Q. Meadows','0','2022-08-11T07:39:22.000Z','zacheryqmeadows2537@google.org','Yw3hGC9igcYnYjVvYix6SxqzDvk2'),
  ('Leah Bird','0','2021-07-12T02:06:32.000Z','leahbird3787@outlook.couk','slfUv9vRAEWBCXiCxLjYQcZEsKi2'),
  ('Neil Odom','0','2020-11-03T01:07:56.000Z','neilodom@google.org','0Ib2yncv2yQeVykA0IM1YVRsWMm2'),
  ('Echo Jordan','0','2022-08-14T01:50:37.000Z','echojordan@outlook.com','k6IQ3dEvGZSblkPQDFrmhkhgqtg2'),
  ('Nicole J. Kim','0','2019-08-22T12:44:21.000Z','nicolejkim@outlook.edu','gV2Ie6XHLfVXtohhqi4R9blYlZn2'),
  ('Graham Berry','0','2021-06-06T08:12:27.000Z','grahamberry6356@yahoo.com','4zGWiq0zIrYbfehuQ5FWg6IJJ1w1'),
  ('Chancellor E. Gillespie','0','2018-03-30T03:03:32.000Z','chancelloregillespie@google.edu','iU9QQ7QYSZUableSGKg48gpvVBg2'),
  ('Garrison Melton','0','2017-11-28T08:55:52.000Z','garrisonmelton@aol.edu','HNfYMAVhyedoBjha7gVBkBxV7xs2')
GO
INSERT INTO [Store]
            ([userId],
            [dateCreated],
            [name],
            [profileImage],
            [coverImage])
        VALUES
            (1, '2020-06-22 04:04:13.413', 'Bee Calm', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/bee%20calm.png?alt=media&token=a416e8b0-d325-4759-b7fa-48dd4e0c47a1', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/be%20calm%20cover.png?alt=media&token=27abcf4c-a519-40e4-aba9-540acd6e93b8'),
            (2, '2019-06-13 10:38:48.020', 'Vegan Bouquet', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/vegan%20bouquet.png?alt=media&token=51fb7512-e7c9-4822-bbac-fc4e5b883df3', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/vegan%20bouquet%20cover.png?alt=media&token=1945acc1-dfda-4413-bd47-ee53ee2bc779'),
            (3, '2022-02-24 14:57:03.100', 'Soy Flamingo', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/soy%20flamingo.png?alt=media&token=80d5a8db-a74d-436b-93e5-052fdd639fa7', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/soy%20flamingo%20cover.png?alt=media&token=ebff5f6b-1e4b-4d60-a9c7-527869bdfdc4'),
            (4, '2021-08-16 16:44:17.180', 'Thyme to Unwind', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/thyme%20to%20unind.png?alt=media&token=49b37b21-1897-4281-9a5e-71e9884b1c3e', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/thyme%20to%20unwind%20cover.png?alt=media&token=74597185-53d7-40d2-b882-93c41c346d9f'),
            (5, '2022-07-22 08:39:28.780', 'Flaming Candle Co.', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/flaming%20Candle%20Co..png?alt=media&token=5e6d50e0-d7f4-43b8-bc08-7ba40d248c7c', 'https://console.firebase.google.com/u/0/project/burnhub-e391e/storage/burnhub-e391e.appspot.com/files'),
            (6, '2018-03-17 13:48:07.200', 'Busy Beeswax Candles', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/busy%20bees%20wax.png?alt=media&token=fa30ee3b-4bc5-4084-bfb2-61e3a38c9b57', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/busy%20bees%20cover.png?alt=media&token=a6ca729a-0a0b-4e3e-887f-89bb8083ee6d'),
            (7, '2020-08-24 17:33:37.307', 'Fabulous Flame', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/fabulous%20flame.png?alt=media&token=daea9424-7df3-4fa1-8c44-3a6405d6b636', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/fabulous%20flame%20cover.png?alt=media&token=ebb27ef6-a65f-45e3-abbd-4b40f06f1e2f'),
            (8, '2022-03-11 18:21:08.090', 'Candle Carvers', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/candle%20carvers.png?alt=media&token=530995e7-f174-4206-b289-ddeb7fa86207', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/candle%20carvers%20cover.png?alt=media&token=63d929e3-dac0-48e5-9545-a3711ee4c2d6'),
            (9, '2020-03-07 11:16:45.682', 'Happy Candle Collective', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/happy%20candle%20collective.png?alt=media&token=c06c8fa8-7659-4822-a6cd-c332c6d06795', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/happy%20candle%20cover.png?alt=media&token=509f4ae1-5f96-4ee0-bece-86960675eaee'),
            (10, '2019-07-11 10:18:47.613', 'Smoked Scents', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/smoked%20scents.png?alt=media&token=70f703f4-af8d-4f16-a733-c62bb43c8a94', 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/smoked%20scents%20cover.png?alt=media&token=88a43903-d121-4366-876f-ddba59325070')
GO
INSERT INTO [Category]
            ([name])
        VALUES
            ('Candle')
GO
INSERT INTO [Item]
            ([name],
             [categoryId],
             [storeId],
             [quantity],
             [description],
             [price],
             [image])
        VALUES
            ('Blue Flicker', 1 , 1 , 2 , 'Pale Blue Soy based candle with wood wick', 10, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/blue-flicker.jpg?alt=media&token=790f0d86-51e1-4860-963c-0f3a5c1bb401'),
            ('Chill Out', 1 , 1 , 3 , 'Pink Soy based candle with wick', 20, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/chill-out.jpg?alt=media&token=5160a08c-7f12-4116-ba6a-bbfe738a8dd4'),
            ('Coastal Rainfall', 1 , 2 , 5 , 'The Ocean Breeze slaps you in the face', 25, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/coastal-rainfall.jpg?alt=media&token=50505cf9-0e75-4371-95fc-64af365ee686'),
            ('Orange Grove', 1 , 2 , 1 , 'Be prepared to be bull dozed by the fragrant aroma of an orange grove', 20, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/orange-grove.jpg?alt=media&token=f3ac0405-00c6-4612-8153-757fbdaa2ec7'),
            ('Abundance', 1 , 3 , 10 , 'Fancy AF with gold flakes make you feel like royalty', 1300, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/abundance.jpg?alt=media&token=8debfb65-b06e-45b5-b680-096a1bacfbe9'),
            ('Gettin'' Lit', 1 , 3 , 3 , 'Treat yo self', 1000, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/gettin-lit.jpg?alt=media&token=d6c62dd1-9813-4823-aa28-ddb52ba269fe'),
            ('Candle', 1 , 4 , 2 , 'its a small fire object', 5, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/a-candle.jpg?alt=media&token=d735ee77-351c-42bd-943e-aceb9a5af20f'),
            ('Call 911', 1 , 4 , 6 , 'indoor fire with nice smell', 5, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/911.jpg?alt=media&token=dcd4ddc8-cbf9-4695-bf58-2193468a5832'),
            ('Summer Time Smiles', 1 , 5 , 11 , 'Soy with slow burn wick and smells like summer', 11, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/summer-time-smiles.jpg?alt=media&token=a72bc48e-75a7-4159-bf75-289e180d6889'),
            ('Crisp Fall Air', 1 , 5 , 12 , 'Soy with slow burn wick and smells like fall', 12, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/crisp-fall-air.jpg?alt=media&token=c571326c-7646-426b-b37c-6b36bf9e1ad4'),
            ('Christmas Spirit', 1 , 6 , 4 , 'French vanilla candle', 15, 'https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/christmas-spirit.jpg?alt=media&token=2a456f78-2949-4878-b26d-050ce768bd99'),
            ('Sweet Apples', 1 , 6 , 9 , 'Apple candle', 16, NULL),
            ('Rose', 1 , 7 , 8 , '200hr burn time with the smell of roses', 40, NULL),
            ('Laundry Day', 1 , 7 , 12 , '500hr burn time with the smell of fresh laundry', 60, NULL),
            ('Cinnamon Bun', 1 , 8 , 3 ,  null, 12, NULL),
            ('Lavender', 1 , 8 , 18 , null, 14, NULL),
            ('Fresh Peaches On The Farm In The Morning', 1 , 9 , 12 , 'peach truck summer day in mason jar', 20, NULL),
            ('Spring Flowers', 1 , 9 , 10 , 'wild flower walk in the sun in large mason jar', 35, NULL),
            ('Shamrockin'' Flavor', 1 , 10 , 2 , '10oz mint green refresher', 18, NULL),
            ('Sparkling Limeade', 1 , 10 , 8 , '12oz lemon-lime refresher', 26, NULL)
GO
INSERT INTO [Favorite]
            ([itemId],
            [userId])
        VALUES
            ( 7, 23),
            ( 3, 33),
            ( 8, 37),
            ( 14, 13),
            ( 2, 16),
            ( 1, 14),
            ( 9, 4),
            ( 12, 29),
            ( 14, 37),
            ( 4, 32),
            ( 19, 27),
            ( 8, 31),
            ( 17, 24),
            ( 13, 22),
            ( 16, 29),
            ( 15, 12),
            ( 11, 3)
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
            [itemId],
            [itemQuantity])
        VALUES
            (1,15,1),
            (1,2,1),
            (2,10,1),
            (2,3,1),
            (3,5,1),
            (3,16,1),
            (4,12,1),
            (4,2,3),
            (4,3,1),
            (5,2,2),
            (5,10,1),
            (6,10,1),
            (6,15,2),
            (7,18,2),
            (7,20,1),
            (8,20,2),
            (8,10,1),
            (9,5,2),
            (9,3,1),
            (10,1,1),
            (11,2,1),
            (12,9,1),
            (13,5,1),
            (14,10,1),
            (15,15,1),
            (16,18,1),
            (17,5,1),
            (18,2,1),
            (19,5,1),
            (20,10,1)
GO