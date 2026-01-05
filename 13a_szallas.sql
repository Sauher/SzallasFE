-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 05. 10:19
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_szallas`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accommodations`
--

CREATE TABLE `accommodations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `basePrice` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accommodations`
--

INSERT INTO `accommodations` (`id`, `name`, `description`, `address`, `capacity`, `basePrice`, `active`, `createdAt`) VALUES
(1, 'Zakuoma Airport', 'Non-toxic traps for catching household pests safely.', 'Kaiserstraße 16 (Kaiserplatz)', 1, 53, 0, '2025-06-16 02:44:12'),
(2, 'Jining Qufu Airport', 'Set of soothing scented candles for relaxation and ambiance.', 'Hauptplatz, 103', 7, 1, 0, '2025-01-23 00:42:46'),
(3, 'Djambala Airport', 'Elegant classic pumps that add sophistication to any outfit.', 'Carnegieplein 4', 5, 41, 1, '2025-10-08 15:55:45'),
(4, 'Dorunda Airport', 'Soft and tasty gluten-free sandwich bread.', '1, Place de Metz', 3, 196, 1, '2025-12-13 11:54:50'),
(5, 'Khwai River Lodge Airport', 'Savory sausage links seasoned with Italian spices.', '4, rue Thomas Edison', 4, 194, 0, '2025-05-01 01:06:52'),
(6, 'Dillant Hopkins Airport', 'Creamy and rich vanilla ice cream, a classic dessert.', 'Croeselaan 18', 4, 43, 1, '2025-12-03 14:24:08'),
(7, 'Nain Airport', 'Crunchy and flavorful mix of oats and honey.', 'Terreiro D. João V', 2, 102, 1, '2025-11-30 10:06:03'),
(8, 'Echuca Airport', 'High-carbon stainless steel chef knife for precision cutting.', 'PO BOX 2508', 9, 30, 0, '2025-09-17 08:55:11'),
(9, 'Mandabe Airport', 'Adjustable stand for portable speakers and devices.', 'Jura Alunāna iela 2', 4, 178, 1, '2025-06-11 13:11:33'),
(10, 'Kópasker Airport', 'Tender jackfruit cooked in BBQ sauce, a delicious plant-based alternative.', 'VIALE ALTIERO SPINELLI, 30', 3, 12, 0, '2025-06-24 08:05:28'),
(11, 'Mikkeli Airport', 'Plain white rice, a staple for any meal.', '3 The Mall, Main Street, Lucan,', 3, 148, 1, '2025-05-25 13:26:02'),
(12, 'Hakkari Yüksekova Airport', 'Natural elderberry syrup to boost immunity.', '4140 EAST STATE STREET', 6, 104, 0, '2025-01-14 15:39:22'),
(13, 'Butare Airport', 'Healthy pasta alternative made from chickpeas', 'PIAZZA FILIPPO MEDA 4', 5, 145, 1, '2025-01-13 14:14:13'),
(14, 'Keflavik International Airport', 'Elegant chiffon blouse perfect for work or outings.', '1 TALLMAN RD', 4, 43, 0, '2025-09-09 15:33:32'),
(15, 'Toccoa Airport - R.G. Letourneau Field', 'Complete set of cooking utensils made from bamboo.', 'Sos. Fabrica de Glucoza nr.5, Business Center, Novo Park 3, cladirea F, et.5 si 6, sector 2', 7, 82, 0, '2025-09-29 03:17:12'),
(16, 'Ouango Fitini Airport', 'Energy-efficient lights that charge during the day and illuminate at night.', '7 PROMENADE GERMAINE SABLON', 2, 66, 0, '2025-04-09 11:54:37'),
(17, 'Subic Bay International Airport', 'Compostable plates suitable for various occasions.', 'Ludwig-Weimar-Gasse 5', 3, 168, 0, '2025-08-20 07:10:14'),
(18, 'Moussoro Airport', 'GPS collar that monitors your pet\'s location and activity level.', '111 SILVAN AVENUE', 4, 24, 0, '2025-10-01 14:49:21'),
(19, 'Ampanihy Airport', 'High-density, non-slip yoga mat for stability and comfort.', 'ACH OPERATIONS 100-99-04-10', 7, 94, 0, '2025-09-09 20:34:34'),
(20, 'Furnace Creek Airport', 'Fun and educational puzzle set for kids.', '17555 NORTHEAST SACRAMENTO STREET', 4, 83, 0, '2025-10-23 22:02:46'),
(21, 'Red Dog Airport', 'Moist, fluffy muffins packed with bananas and walnuts for a delightful breakfast or snack.', 'PIAZZA FILIPPO MEDA 4', 2, 198, 1, '2025-08-05 07:04:48'),
(22, 'Eastern Sierra Regional Airport', 'Fruits dipped in rich chocolate, perfect for desserts.', 'BOX 540', 10, 118, 0, '2025-04-03 11:45:53'),
(23, 'Jipijapa Airport', 'A flavorful lentil curry cooked with vegetables and spices.', 'PIAZZA DEL CALENDARIO, 3', 2, 168, 0, '2025-03-13 07:14:11'),
(24, 'Balcanoona Airport', 'A stylish midi dress with stylish pleats, suitable for any occasion.', '24010 PARTNERSHIP BOULEVARD', 3, 148, 1, '2025-12-22 03:00:56'),
(25, 'Kingaroy Airport', 'Advanced wristband that tracks daily activities and sleep.', 'PO BOX 38', 4, 179, 1, '2025-02-24 17:36:11'),
(26, 'Dangriga Airport', 'Instant pressure cooker with multiple cooking settings.', 'ul. Kamionka 27', 10, 178, 0, '2025-03-12 15:38:07'),
(27, 'Sher-Wood Airport', 'Crunchy granola with chocolate and coconut, great for breakfast or snacks.', 'P.O. BOX 1377', 1, 6, 0, '2025-04-18 14:55:18'),
(28, 'Middleton Island Airport', 'Multi-level cat tree for play and scratching.', 'Am Stadtpark, 9', 5, 82, 0, '2025-05-08 07:15:28'),
(29, 'Medicine Hat Airport', 'Classic ranch dressing for salads and dipping.', '1008 OAK STREET', 4, 126, 1, '2025-04-12 16:48:13'),
(30, 'Ulan-Ude Airport (Mukhino)', 'Hanging bird feeder for backyard birds.', '8 ALLÉE DES COLLÈGES', 9, 130, 1, '2025-12-07 04:03:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accommodation_images`
--

CREATE TABLE `accommodation_images` (
  `id` int(11) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `imagepath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accommodation_images`
--

INSERT INTO `accommodation_images` (`id`, `accommodationId`, `imagepath`) VALUES
(1, 9, 'dump_acc_img'),
(2, 14, 'dump_acc_img'),
(3, 15, 'dump_acc_img'),
(4, 29, 'dump_acc_img'),
(5, 24, 'dump_acc_img'),
(6, 20, 'dump_acc_img'),
(7, 27, 'dump_acc_img'),
(8, 18, 'dump_acc_img'),
(9, 17, 'dump_acc_img'),
(10, 6, 'dump_acc_img'),
(11, 1, 'dump_acc_img'),
(12, 3, 'dump_acc_img'),
(13, 18, 'dump_acc_img'),
(14, 3, 'dump_acc_img'),
(15, 20, 'dump_acc_img'),
(16, 28, 'dump_acc_img'),
(17, 1, 'dump_acc_img'),
(18, 26, 'dump_acc_img'),
(19, 17, 'dump_acc_img'),
(20, 13, 'dump_acc_img'),
(21, 12, 'dump_acc_img'),
(22, 2, 'dump_acc_img'),
(23, 17, 'dump_acc_img'),
(24, 4, 'dump_acc_img'),
(25, 4, 'dump_acc_img'),
(26, 26, 'dump_acc_img'),
(27, 3, 'dump_acc_img'),
(28, 23, 'dump_acc_img'),
(29, 22, 'dump_acc_img'),
(30, 10, 'dump_acc_img');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `persons` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `role`, `createdAt`, `status`) VALUES
(1, 'gitignora', 'gitignora@turr.hu', 'b44dda1dadd351948fcace1856ed97366e679239', '', '', 'user', '2026-01-05 07:30:18', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `accommodation_images`
--
ALTER TABLE `accommodation_images`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `accommodations`
--
ALTER TABLE `accommodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `accommodation_images`
--
ALTER TABLE `accommodation_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
