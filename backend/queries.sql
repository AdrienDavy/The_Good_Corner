DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS category;

PRAGMA foreign_keys = ON;
DELETE from category WHERE id=3;

CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
    categoryId INTEGER NOT NULL,
	createdAt DATE,
    FOREIGN KEY (categoryId) REFERENCES category(id)
);

CREATE TABLE category
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO category (name)
VALUES
    ('Clothing'),
    ('Bike'),
    ('Car'),
    ('Real Estate'),
    ('Furniture'),
    ('Electronics'),
    ('Musical Instruments'),
    ('Tools'),
    ('Outdoor'),
    ('Sports'),
    ('Home Appliances'),
    ('Baby Products'),
    ('Other');


INSERT INTO `ad` (`title`, `description`, `owner`, `price`, `picture`, `location`, `categoryId`, `createdAt`)
VALUES
    (
        'Leather Jacket for sale',
        'Black leather jacket, barely worn, in excellent condition. Perfect for fall and winter.',
        'jacket.seller@gmail.com',
        150,
        'https://cdn.pixabay.com/photo/2017/08/05/22/24/fashion-2589340_1280.jpg',
        'Paris',
        1,
        '2023-09-05T10:13:14.755Z'
    ),
    (
        'Summer Dress for sale',
        'Beautiful summer dress, lightly worn. Perfect for casual outings.',
        'dress.seller@gmail.com',
        60,
        'https://cdn.pixabay.com/photo/2017/09/24/10/36/summer-dress-2781603_1280.jpg',
        'Lyon',
        1,
        '2023-07-15T12:10:29.122Z'
    ),
    (
        'Mountain Bike for sale',
        'A black mountain bike in excellent condition. Selling because I upgraded to a new model.',
        'mountainbike.seller@gmail.com',
        250,
        'https://cdn.pixabay.com/photo/2017/05/11/08/35/mountain-bike-2304287_1280.jpg',
        'Lyon',
        2,
        '2023-07-22T09:27:30.712Z'
    ),
    (
        'City Bike for sale',
        'City bike in good condition, perfect for commuting.',
        'citybike.seller@gmail.com',
        150,
        'https://cdn.pixabay.com/photo/2016/11/21/17/26/bicycle-1846111_1280.jpg',
        'Paris',
        2,
        '2023-08-15T11:25:14.612Z'
    ),
    (
        'Car to sell',
        'A well-maintained car, perfect for city driving. Selling because I am moving abroad.',
        'car.seller@gmail.com',
        9000,
        'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg',
        'Paris',
        3,
        '2023-10-01T11:14:22.101Z'
    ),
    (
        'Used Car for sale',
        'Blue sedan, lightly used, in excellent condition.',
        'usedcar.seller@gmail.com',
        7500,
        'https://cdn.pixabay.com/photo/2016/11/21/16/17/car-1845739_1280.jpg',
        'Bordeaux',
        3,
        '2023-09-18T10:20:22.754Z'
    ),
    (
        'Apartment for rent',
        'Spacious apartment in the heart of Bordeaux, ideal for families or professionals.',
        'apartment.owner@gmail.com',
        1200,
        'https://cdn.pixabay.com/photo/2016/09/29/17/10/architecture-1707727_1280.jpg',
        'Bordeaux',
        4,
        '2023-09-15T09:50:12.201Z'
    ),
    (
        'Office Desk for sale',
        'Large wooden desk with drawers. Perfect for a home office setup.',
        'desk.seller@gmail.com',
        200,
        'https://cdn.pixabay.com/photo/2017/09/16/16/09/office-2756356_1280.jpg',
        'Paris',
        5,
        '2023-10-25T10:14:35.000Z'
    ),
    (
        'Laptop for sale',
        'Latest laptop model with 16GB RAM and 1TB SSD. Barely used.',
        'laptop.seller@gmail.com',
        800,
        'https://cdn.pixabay.com/photo/2014/08/29/14/57/laptop-429292_1280.jpg',
        'Lyon',
        6,
        '2023-11-10T15:20:30.533Z'
    ),
    (
        'Electric Guitar for sale',
        'Well-maintained electric guitar with amplifier. Great for beginners.',
        'guitar.seller@gmail.com',
        450,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Fender_Stratocaster_electric_guitar.JPG/640px-Fender_Stratocaster_electric_guitar.JPG',
        'Lyon',
        7,
        '2023-06-12T08:30:50.642Z'
    ),
    (
        'Power Drill for sale',
        'Powerful drill, used only for a few projects. Perfect for DIY enthusiasts.',
        'drill.seller@gmail.com',
        80,
        'https://cdn.pixabay.com/photo/2017/06/23/21/55/drill-2438661_1280.jpg',
        'Bordeaux',
        8,
        '2023-10-13T10:23:14.533Z'
    ),
    (
        'Camping Tent for sale',
        '4-person camping tent, used only once. Great for weekend adventures.',
        'tent.seller@gmail.com',
        120,
        'https://cdn.pixabay.com/photo/2016/07/04/11/53/tent-1497618_1280.jpg',
        'Lyon',
        9,
        '2023-09-20T08:30:40.712Z'
    ),
    (
        'Football for sale',
        'Brand new football, never used. Selling because I received two.',
        'football.seller@gmail.com',
        30,
        'https://cdn.pixabay.com/photo/2016/03/27/19/20/football-1283215_1280.jpg',
        'Paris',
        10,
        '2023-08-10T16:32:10.202Z'
    ),
    (
        'Washing Machine for sale',
        'High-efficiency washing machine, perfect for large families. Barely used, like new.',
        'washingmachine.seller@gmail.com',
        700,
        'https://cdn.pixabay.com/photo/2015/06/23/12/23/washing-machine-818263_1280.jpg',
        'Paris',
        11,
        '2023-08-29T15:35:25.412Z'
    ),
    (
        'Baby Stroller for sale',
        'Lightweight baby stroller in excellent condition. Only used for a few months.',
        'stroller.seller@gmail.com',
        150,
        'https://cdn.pixabay.com/photo/2016/07/11/17/25/stroller-1500733_1280.jpg',
        'Bordeaux',
        12,
        '2023-07-29T10:33:50.002Z'
    ),
    (
        'Vintage Vinyl Records for sale',
        'Collection of rare vintage vinyl records from the 70s. In great condition.',
        'vinyl.seller@gmail.com',
        150,
        'https://cdn.pixabay.com/photo/2016/11/23/14/45/vinyl-1850120_1280.jpg',
        'Bordeaux',
        13,
        '2023-07-07T11:09:05.533Z'
    );


SELECT * from ad;

SELECT * from ad WHERE location = 'Bordeaux';

-- DELETE from ad where price > 40;

UPDATE ad SET price = 0 where createdAt LIKE '%2023-09-01%';

SELECT AVG(price) as average_price_in_paris FROM ad WHERE location = 'Paris';

SELECT location,AVG(price) as average_price FROM ad GROUP BY location;

-- ____________________________________________

SELECT * FROM ad JOIN category on ad.categoryId=category.id WHERE category.name = "Clothing";

SELECT * FROM ad JOIN category on ad.categoryId=category.id  WHERE category.name IN("Clothing", "Car");

SELECT AVG(price) as average_price_other FROM ad JOIN category on ad.categoryId=category.id WHERE category.name = "Other";

SELECT * FROM ad JOIN category on ad.categoryId=category.id WHERE ad.title LIKE "V%";

