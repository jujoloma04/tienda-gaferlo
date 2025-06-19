-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 20:01:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gflm_seals`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seals`
--

CREATE TABLE `seals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seals`
--

INSERT INTO `seals` (`id`, `name`, `material`, `price`, `description`) VALUES
(1, 'Sello de Goma NBR', 'NBR', 10000.00, 'Sello estándar para fluidos hidráulicos.'),
(2, 'Sello de Poliuretano', 'Poliuretano', 15000.00, 'Alta resistencia a la abrasión.'),
(3, 'Sello de Vitón', 'Vitón', 20000.00, 'Ideal para alta temperatura y químicos.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `seals`
--
ALTER TABLE `seals`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
