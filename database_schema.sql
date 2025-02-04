CREATE DATABASE IF NOT EXISTS hubify CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hubify;

CREATE TABLE `contact` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `deal` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`status` int NOT NULL COMMENT '1 - Em negociação; 2 - Ganha; 3 - Perdida',
	`contact_id` int NOT NULL,
	`funnel_id` int NOT NULL,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `funnel` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;