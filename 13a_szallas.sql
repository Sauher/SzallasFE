-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 07. 12:05
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
  `owner_Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `basePrice` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imageUrl` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accommodations`
--

INSERT INTO `accommodations` (`id`, `owner_Id`, `name`, `description`, `address`, `capacity`, `basePrice`, `active`, `createdAt`, `imageUrl`) VALUES
(1, 2, 'Georgia', 'Fentland', 'Floyd 67', 21, 444, 0, '2026-01-07 08:05:40', 'image-1767780373742-555992021.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `reservation_name` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `persons` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `reservation_name`, `phone`, `accommodationId`, `startDate`, `endDate`, `persons`, `totalPrice`, `status`, `createdAt`) VALUES
(1, 0, '', '+36301234567', 5, '2026-01-10', '2026-01-15', 1, 970, 0, '2026-01-07 08:07:51'),
(2, 1, 'Ohrad Kálmán', '+36301234567', 7, '2026-01-10', '2026-01-14', 1, 408, 0, '2026-01-07 08:34:01'),
(3, 1, 'Ohrad Kálmán', '+36301234567', 3, '2026-01-11', '2026-01-15', 1, 164, 0, '2026-01-07 10:16:09'),
(4, 1, 'Ohrad Kálmán', '+36301234567', 21, '2026-01-08', '2026-01-20', 1, 2376, 0, '2026-01-07 10:17:40'),
(5, 1, 'Ohrad Kálmán', '+36301234567', 21, '2026-01-10', '2026-01-11', 1, 198, 0, '2026-01-07 10:24:52'),
(6, 1, 'vcxx', 'vxxxxb', 3, '2026-01-10', '2026-01-24', 1, 574, 0, '2026-01-07 10:52:28'),
(7, 4, 'Angu Laura', '+36704354', 1, '2026-01-08', '2026-01-18', 1, 4440, 0, '2026-01-07 11:03:59');

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
(1, 'gitignora', 'gitignora@turr.hu', 'b44dda1dadd351948fcace1856ed97366e679239', '', '', 'admin', '2026-01-05 09:30:09', 0),
(2, 'Owner', 'owner@owner.com', '8c11dfa2408f43baf07459c7cdabc732266ee800', '', '', 'owner', '2026-01-05 11:10:19', 0),
(3, 'User Róbert', 'userrobi@turr.hu', '006676b686e8d1a0d55e1214fa0a3fbf3178a87d', '', '', 'user', '2026-01-07 06:13:41', 0),
(4, 'Angu Laura', 'angulau@turr.hu', 'b44dda1dadd351948fcace1856ed97366e679239', '', '', 'user', '2026-01-07 10:56:31', 0),
(5, 'Admin', 'a@a.hu', '2edded3e0e9c1bfa55b2d007c6d0d70f87b40d6d', '', '', 'admin', '2026-01-07 04:14:51', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `accommodations`
--
ALTER TABLE `accommodations`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
