-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2022 a las 04:23:40
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `resto_acamica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medios_de_pago`
--

CREATE TABLE `medios_de_pago` (
  `idPays` int(2) NOT NULL,
  `pays_name` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `medios_de_pago`
--

INSERT INTO `medios_de_pago` (`idPays`, `pays_name`) VALUES
(1, 'lemon cash'),
(2, 'T. debito'),
(3, 'T. credito'),
(4, 'Puntos disponibles'),
(5, 'Transferencia Bancaria'),
(6, 'Paypal'),
(7, 'Criptomoneda'),
(9, 'efectivo'),
(10, 'contrareembolso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(7) NOT NULL,
  `id_user_order` int(4) NOT NULL,
  `idMethodPay_order` int(2) NOT NULL,
  `id_state_order` int(1) NOT NULL,
  `price_order` int(4) DEFAULT '0',
  `addres_order` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `date_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`idOrder`, `id_user_order`, `idMethodPay_order`, `id_state_order`, `price_order`, `addres_order`, `date_order`) VALUES
(315, 29, 2, 1, 12, 'ss', '2022-01-22 07:45:07'),
(316, 29, 2, 1, 12, 'ss', '2022-01-22 07:45:20'),
(317, 29, 2, 1, 12, 'ss', '2022-01-22 07:45:20'),
(318, 29, 2, 1, 14, 'sdsdsdsds', '2022-01-22 07:45:49'),
(319, 29, 2, 1, 12, 'ss', '2022-01-22 07:45:22'),
(320, 27, 2, 3, 10, 'la tablada 1212', '2022-02-07 19:58:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_status`
--

CREATE TABLE `order_status` (
  `idOrder` int(1) NOT NULL,
  `order_name` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `order_status`
--

INSERT INTO `order_status` (`idOrder`, `order_name`) VALUES
(1, 'Pemdiente'),
(2, 'Confirmado'),
(3, 'En preparación'),
(4, 'Enviado'),
(5, 'Entregado'),
(6, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProduct` int(11) NOT NULL,
  `productName` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `productPrice` int(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProduct`, `productName`, `productPrice`) VALUES
(1, 'panchito', 2),
(2, 'remera', 10),
(3, 'pizza', 190),
(4, 'salchipapas', 100),
(5, 'polenta con salsa', 12345);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_order`
--

CREATE TABLE `products_order` (
  `id_produt_order` int(11) NOT NULL,
  `id_order` int(6) NOT NULL,
  `id_product` int(2) NOT NULL,
  `quantity` int(2) NOT NULL,
  `price` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `products_order`
--

INSERT INTO `products_order` (`id_produt_order`, `id_order`, `id_product`, `quantity`, `price`) VALUES
(195, 315, 1, 1, 2),
(196, 315, 2, 1, 10),
(197, 316, 1, 1, 2),
(198, 316, 2, 1, 10),
(199, 317, 1, 1, 2),
(200, 317, 2, 1, 10),
(203, 319, 1, 1, 2),
(204, 319, 2, 1, 10),
(207, 318, 1, 1, 2),
(208, 318, 2, 1, 10),
(209, 318, 1, 1, 2),
(213, 320, 2, 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(1) NOT NULL,
  `rol_name` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `rol_name`) VALUES
(1, 'admin'),
(2, 'cliente'),
(3, 'Editor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `televisores`
--

CREATE TABLE `televisores` (
  `id_televisor` int(4) NOT NULL,
  `marca_televisor` varchar(25) NOT NULL,
  `modelo_televisor` varchar(25) NOT NULL,
  `precio` int(4) NOT NULL,
  `tamano_pantalla` int(2) NOT NULL,
  `smart_tv` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `televisores`
--

INSERT INTO `televisores` (`id_televisor`, `marca_televisor`, `modelo_televisor`, `precio`, `tamano_pantalla`, `smart_tv`) VALUES
(1, 'Samsung', 'XE65UHDX', 1000, 65, 1),
(2, 'lg', 'HK 10', 700, 50, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `username` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `username_name` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `user_email` varchar(24) COLLATE utf8mb4_spanish_ci NOT NULL,
  `user_tel` bigint(12) NOT NULL,
  `user_address` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `user_password` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `user_idRol` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `username`, `username_name`, `user_email`, `user_tel`, `user_address`, `user_password`, `user_idRol`) VALUES
(1, 'administrador', 'gerente resto', 'admin@resto.com', 1156345789, 'alfonso 600', '7e16036a55664f22e6511e460ee09d4f', 1),
(10, 'martin', 'buxman', 'mar@tin.com', 303456, 'c-s/n 686', '0303', 3),
(11, 'carlos', 'bown ', 'carlos@lean.com', 1234500, 's/n 07', '0123', 3),
(27, 'ale', 'ALEJANDRA', 'ale@ale.com', 12332321, 'lkaslkas', '7e16036a55664f22e6511e460ee09d4f', 2),
(28, 'leandro', 'cliente', 'cliente@cliente.com', 1234323, 'blabla', '087c8abfaee44ebbf0c2871976a2ab18', 2),
(29, 'riquelme', 'juan', 'juan@juan.com', 123456776543, 'la boca', '087c8abfaee44ebbf0c2871976a2ab18', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medios_de_pago`
--
ALTER TABLE `medios_de_pago`
  ADD PRIMARY KEY (`idPays`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `id_user_order` (`id_user_order`),
  ADD KEY `idMethodPay_order` (`idMethodPay_order`),
  ADD KEY `id_state_order` (`id_state_order`);

--
-- Indices de la tabla `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`idOrder`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indices de la tabla `products_order`
--
ALTER TABLE `products_order`
  ADD PRIMARY KEY (`id_produt_order`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `televisores`
--
ALTER TABLE `televisores`
  ADD PRIMARY KEY (`id_televisor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `user_idRol` (`user_idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medios_de_pago`
--
ALTER TABLE `medios_de_pago`
  MODIFY `idPays` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT de la tabla `order_status`
--
ALTER TABLE `order_status`
  MODIFY `idOrder` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products_order`
--
ALTER TABLE `products_order`
  MODIFY `id_produt_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `televisores`
--
ALTER TABLE `televisores`
  MODIFY `id_televisor` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`idMethodPay_order`) REFERENCES `medios_de_pago` (`idPays`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_state_order`) REFERENCES `order_status` (`idOrder`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_user_order`) REFERENCES `users` (`idUser`);

--
-- Filtros para la tabla `products_order`
--
ALTER TABLE `products_order`
  ADD CONSTRAINT `products_order_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `productos` (`idProduct`),
  ADD CONSTRAINT `products_order_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `orders` (`idOrder`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
