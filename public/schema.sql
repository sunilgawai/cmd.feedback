CREATE DATABASE  IF NOT EXISTS `bettingsadmin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bettingsadmin`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: bettingsadmin
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abbetrec`
--

DROP TABLE IF EXISTS `abbetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abbetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `clo` varchar(21) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `abbetting`
--

DROP TABLE IF EXISTS `abbetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abbetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `abperiod`
--

DROP TABLE IF EXISTS `abperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abperiod` (
  `id` int NOT NULL DEFAULT '1',
  `period` bigint NOT NULL,
  `num` int DEFAULT NULL,
  `nxt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `apply`
--

DROP TABLE IF EXISTS `apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(211) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(211) NOT NULL DEFAULT 'Applying',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aviset`
--

DROP TABLE IF EXISTS `aviset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aviset` (
  `id` int NOT NULL,
  `nxt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `beconebet`
--

DROP TABLE IF EXISTS `beconebet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beconebet` (
  `TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `beconebetrec`
--

DROP TABLE IF EXISTS `beconebetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beconebetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `beconebetting`
--

DROP TABLE IF EXISTS `beconebetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beconebetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` bigint NOT NULL,
  `ans` int NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` varchar(211) NOT NULL DEFAULT 'wait',
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `beconeperiod`
--

DROP TABLE IF EXISTS `beconeperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beconeperiod` (
  `id` int NOT NULL DEFAULT '1',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`period`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bet`
--

DROP TABLE IF EXISTS `bet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bet` (
  `TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `betrec`
--

DROP TABLE IF EXISTS `betrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `betrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `clo` tinytext NOT NULL,
  `res1` varchar(211) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22485 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `betting`
--

DROP TABLE IF EXISTS `betting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `betting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` varchar(211) NOT NULL DEFAULT 'wait',
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  `color` text NOT NULL,
  `am` varchar(211) NOT NULL DEFAULT 'wait',
  `color2` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bonus`
--

DROP TABLE IF EXISTS `bonus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bonus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `giver` bigint NOT NULL,
  `usercode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10539 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `Ticket` varchar(211) NOT NULL,
  `Support` varchar(211) NOT NULL,
  `Transaction` varchar(211) NOT NULL,
  `refno` varchar(211) NOT NULL,
  `Description` varchar(211) NOT NULL,
  `Amount` int DEFAULT NULL,
  `PaidTo` varchar(211) NOT NULL,
  `UTR` varchar(211) NOT NULL,
  `account` varchar(211) NOT NULL,
  `ifsc` varchar(211) NOT NULL,
  `Mode` varchar(211) NOT NULL,
  `Resolution` varchar(211) NOT NULL,
  `Status` varchar(211) NOT NULL DEFAULT 'processing',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `screenshot` varchar(211) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crashbetrecord`
--

DROP TABLE IF EXISTS `crashbetrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crashbetrecord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(211) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(211) NOT NULL DEFAULT 'pending',
  `winpoint` varchar(211) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=561 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crashgamerecord`
--

DROP TABLE IF EXISTS `crashgamerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crashgamerecord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `crashpoint` varchar(211) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3021 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `democrashbetrecord`
--

DROP TABLE IF EXISTS `democrashbetrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `democrashbetrecord` (
  `id` int NOT NULL,
  `username` varchar(211) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(211) NOT NULL DEFAULT 'pending',
  `winpoint` varchar(211) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `democrashgamerecord`
--

DROP TABLE IF EXISTS `democrashgamerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `democrashgamerecord` (
  `id` int NOT NULL,
  `crashpoint` varchar(211) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emredbet`
--

DROP TABLE IF EXISTS `emredbet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emredbet` (
  `TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emredbetrec`
--

DROP TABLE IF EXISTS `emredbetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emredbetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `clo` tinytext NOT NULL,
  `res1` varchar(211) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5672 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emredbetting`
--

DROP TABLE IF EXISTS `emredbetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emredbetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` varchar(211) NOT NULL DEFAULT 'wait',
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  `color` text NOT NULL,
  `am` varchar(211) NOT NULL DEFAULT 'wait',
  `color2` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emredperiod`
--

DROP TABLE IF EXISTS `emredperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emredperiod` (
  `id` int NOT NULL DEFAULT '1',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gift`
--

DROP TABLE IF EXISTS `gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `share` int NOT NULL,
  `code` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `giftrec`
--

DROP TABLE IF EXISTS `giftrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giftrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=550 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `help`
--

DROP TABLE IF EXISTS `help`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help` (
  `id` int NOT NULL,
  `username` varchar(211) NOT NULL,
  `outid` int NOT NULL,
  `whatsapp` varchar(211) NOT NULL,
  `des` longtext NOT NULL,
  `status` varchar(211) NOT NULL DEFAULT 'wait',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mine`
--

DROP TABLE IF EXISTS `mine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(211) NOT NULL,
  `period` varchar(211) NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double(10,2) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  `win` float(10,2) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=744 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mine_setting`
--

DROP TABLE IF EXISTS `mine_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mine_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minserver9` int NOT NULL DEFAULT '0',
  `minserver16` int NOT NULL DEFAULT '0',
  `minserver64` int NOT NULL DEFAULT '0',
  `maxserver9` int NOT NULL DEFAULT '9',
  `maxserver16` int NOT NULL DEFAULT '16',
  `maxserver64` int NOT NULL DEFAULT '64',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Invite members to recharge 300 rupees to get bonus 100 rupees. About Recharge and withdrawal,contact customer care',
  `upi` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `upi1` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` int NOT NULL,
  `api` varchar(412) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `id` int NOT NULL DEFAULT '1',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recharge`
--

DROP TABLE IF EXISTS `recharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recharge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recharge` double NOT NULL,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upi` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `utr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rand` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `utr` (`utr`)
) ENGINE=InnoDB AUTO_INCREMENT=779 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `withdraw` double(10,2) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Applying',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rand` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `upi` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankname` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc` varchar(115) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Payment failed',
  `type` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `saprebet`
--

DROP TABLE IF EXISTS `saprebet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saprebet` (
  `TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `saprebetrec`
--

DROP TABLE IF EXISTS `saprebetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saprebetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `clo` tinytext NOT NULL,
  `res1` varchar(211) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8506 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `saprebetting`
--

DROP TABLE IF EXISTS `saprebetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saprebetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` varchar(211) NOT NULL DEFAULT 'wait',
  `number` varchar(255) NOT NULL DEFAULT 'wait',
  `color` text NOT NULL,
  `am` varchar(211) NOT NULL DEFAULT 'wait',
  `color2` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=499 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sapreperiod`
--

DROP TABLE IF EXISTS `sapreperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sapreperiod` (
  `id` int NOT NULL DEFAULT '1',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recharge` int NOT NULL DEFAULT '200',
  `withdraw` int NOT NULL DEFAULT '330',
  `bonus` int NOT NULL DEFAULT '100',
  `telegroup` varchar(211) DEFAULT NULL,
  `support` varchar(211) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `signin`
--

DROP TABLE IF EXISTS `signin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(211) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=464 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trans`
--

DROP TABLE IF EXISTS `trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `reason` varchar(150) NOT NULL,
  `amount` double NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14011 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usercode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `balance` double(10,2) NOT NULL DEFAULT '0.00',
  `account` bigint NOT NULL DEFAULT '1111111111',
  `ifsc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Not Addeed',
  `withdraw` int NOT NULL,
  `refcode1` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refcode2` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `upi` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'User',
  `bonus` float NOT NULL DEFAULT '0',
  `r_ip` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankname` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(511) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `ip` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waggering` float NOT NULL DEFAULT '0',
  `paytm` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `demobalance` int NOT NULL DEFAULT '0',
  `token` varchar(211) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `signuptask` tinyint(1) NOT NULL DEFAULT '0',
  `rechargetask` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=121558 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verify`
--

DROP TABLE IF EXISTS `verify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` bigint NOT NULL,
  `otp` int NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4084 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vipbet`
--

DROP TABLE IF EXISTS `vipbet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vipbet` (
  `TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vipbetrec`
--

DROP TABLE IF EXISTS `vipbetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vipbetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `clo` tinytext NOT NULL,
  `num` varchar(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34019 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vipbetting`
--

DROP TABLE IF EXISTS `vipbetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vipbetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` varchar(255) NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `fres` varchar(211) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=562 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vipperiod`
--

DROP TABLE IF EXISTS `vipperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vipperiod` (
  `id` int NOT NULL DEFAULT '0',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wheelbetrec`
--

DROP TABLE IF EXISTS `wheelbetrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheelbetrec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` bigint NOT NULL,
  `ans` varchar(11) NOT NULL,
  `clo` tinytext NOT NULL,
  `num` varchar(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34016 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wheelbetting`
--

DROP TABLE IF EXISTS `wheelbetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheelbetting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `period` varchar(255) NOT NULL,
  `ans` varchar(11) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `res` varchar(255) NOT NULL DEFAULT 'wait',
  `fres` varchar(211) NOT NULL DEFAULT 'wait',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wheelperiod`
--

DROP TABLE IF EXISTS `wheelperiod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheelperiod` (
  `id` int NOT NULL DEFAULT '0',
  `period` bigint NOT NULL,
  `nxt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 12:31:11
