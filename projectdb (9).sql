-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Dec 21, 2025 at 05:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `registrationNumber` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `contactInfo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`registrationNumber`, `name`, `sector`, `contactInfo`) VALUES
('232', 'adfa', 'fdsf', 'dafv '),
('C2938', 'wds12', 'dsed', 'sdw'),
('C4850', 'tony ahmed', 'Tech ', 'house-2 , road 6 , dhaka'),
('C8391', 'company', 'sportd', '018 uttara dhalka'),
('C8403', 'new company', 'sports', '01762359344'),
('REG001', 'Alpha Tech Ltd', 'Technology', 'alpha@tech.com'),
('REG003', 'Gamma Traders', 'Retail', 'info@gammatraders.com'),
('REG004', 'Delta Solutions', 'IT Services', 'support@deltasolutions.com'),
('REG005', 'Epsilon Corp', 'Finance', 'info@epsiloncorp.com'),
('REG006', 'Zeta Enterprises', 'Healthcare', 'contact@zetaenterprises.com'),
('REG007', 'Eta Logistics', 'Transportation', 'eta@logistics.com'),
('REG009', 'Iota Energy', 'Energy', 'contact@iotaenergy.com'),
('REG010', 'Kappa Designs', 'Fashion', 'support@kappadesigns.com'),
('REG011', 'Lambda Labs', 'Biotechnology', 'info@lambdalabs.com'),
('REG012', 'Mu Electronics', 'Electronics', 'contact@muelectronics.com'),
('REG013', 'Nu Media', 'Media & Entertainment', 'info@numedia.com'),
('REG014', 'Xi Chemicals', 'Chemicals', 'contact@xichemicals.com'),
('REG015', 'Omicron Ventures', 'Investment', 'info@omicronventures.com');

-- --------------------------------------------------------

--
-- Table structure for table `company_representative`
--

CREATE TABLE `company_representative` (
  `rUserId` int(11) NOT NULL,
  `registrationNumber` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_representative`
--

INSERT INTO `company_representative` (`rUserId`, `registrationNumber`, `name`) VALUES
(18, 'C8391', 'hellocompany'),
(1114, NULL, 'khan boy'),
(1115, NULL, 'abul'),
(1116, 'C2938', 'Ss'),
(1119, 'C4850', 'nahein tonmoy'),
(1120, 'C8403', 'mirza ahmed');

-- --------------------------------------------------------

--
-- Table structure for table `fraud`
--

CREATE TABLE `fraud` (
  `alertId` int(11) NOT NULL,
  `riskScore` decimal(5,2) DEFAULT NULL,
  `detectionDate` date DEFAULT NULL,
  `transactionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fraud`
--

INSERT INTO `fraud` (`alertId`, `riskScore`, `detectionDate`, `transactionId`) VALUES
(1, 95.50, '2025-12-01', 1),
(2, 87.25, '2025-12-01', 2),
(3, 90.00, '2025-12-02', 3),
(4, 75.80, '2025-12-02', 4),
(5, 88.40, '2025-12-03', 5),
(6, 92.10, '2025-12-03', 6),
(7, 80.75, '2025-12-04', 7),
(8, 85.60, '2025-12-04', 8),
(9, 91.30, '2025-12-05', 9),
(129248, 999.99, '2025-12-11', 0),
(160973, -0.03, '2025-12-01', 11),
(307579, 0.04, '2025-12-12', 0),
(499115, 0.03, '2025-12-12', 32),
(2147483647, 0.03, '2025-12-29', 121);

-- --------------------------------------------------------

--
-- Table structure for table `institute`
--

CREATE TABLE `institute` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `licenseNumber` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institute`
--

INSERT INTO `institute` (`id`, `name`, `licenseNumber`, `type`) VALUES
(0, 'asa', '456432', 'gg'),
(1, 'Alfa Academy', 'LIC001', 'Educational'),
(2, 'Beta Institute', 'LIC002', 'Research'),
(3, 'Gamma Center', 'LIC003', 'Training'),
(4, 'my Academy', 'LIC004', 'Educational'),
(5, 'Epsilon Labs', 'LIC005', 'Research'),
(6, 'Zeta College', 'LIC006', 'Educational'),
(7, 'Eta Institute', 'LIC007', 'Training'),
(8, 'Theta Academy', 'LIC008', 'Educational'),
(9, 'Iota Center', 'LIC009', 'Research'),
(10, 'Kappa Labs', 'LIC010', 'Research'),
(11, 'Lambda College', 'LIC011', 'Educational'),
(12, 'Mu Institute', 'LIC012', 'Training'),
(13, 'Nu Academy', 'LIC013', 'Educational'),
(14, 'Xi Labs', 'LIC014', 'Research'),
(15, 'Omicron Center', 'LIC015', 'Training'),
(497529, 'etrhj', 'rghjnrdg', 'rytjreytdhj'),
(585119, 'rafi', '12322', 'sports');

-- --------------------------------------------------------

--
-- Table structure for table `institute_representative`
--

CREATE TABLE `institute_representative` (
  `instRepUserId` int(11) NOT NULL,
  `instId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `investor`
--

CREATE TABLE `investor` (
  `iUserId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `accountType` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investor`
--

INSERT INTO `investor` (`iUserId`, `name`, `accountType`) VALUES
(1, 'Arman Hossain', 'Premium'),
(2, 'Nusrat Jahan', 'Standard'),
(3, 'Jubair Rahman', 'Gold'),
(4, 'Sadia Karim', 'Standard'),
(5, 'Tanvir Ahmed', 'Premium'),
(6, 'Mehjabin Akter', 'Gold'),
(7, 'Rafiul Islam', 'Standard'),
(8, 'Samira Akter', 'Premium'),
(9, 'Hasan Mahmud', 'Gold'),
(10, 'Tania Sultana', 'Standard'),
(11, 'Fahim Chowdhury', 'Premium'),
(12, 'rafi', 'regular'),
(13, 'Shakib Rahman', 'Standard'),
(14, 'Rodela Tahsin', 'Premium'),
(15, 'Azmir Hossain', 'Gold'),
(16, 'Nabila Khan', 'Gold'),
(19, 'mirza azam khan', 'regular'),
(1112, 'newinvestor', NULL),
(1113, 'mirza md sufian ', NULL),
(1118, 'admind', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `userId` int(11) NOT NULL,
  `loginTimestamp` datetime DEFAULT NULL,
  `logoutTimestamp` datetime DEFAULT NULL,
  `oldUserData` text DEFAULT NULL,
  `newUserData` text DEFAULT NULL,
  `auditorName` varchar(255) DEFAULT NULL,
  `tradeApprovalStatus` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prediction`
--

CREATE TABLE `prediction` (
  `registrationNumber` varchar(100) NOT NULL,
  `stockId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `predictedPrice` decimal(15,2) DEFAULT NULL,
  `modelName` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `accuracyScore` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prediction`
--

INSERT INTO `prediction` (`registrationNumber`, `stockId`, `timestamp`, `predictedPrice`, `modelName`, `date`, `accuracyScore`) VALUES
('1244', 23, '2025-12-19 22:02:00', 2.00, 'gemin pro version', '0000-00-00', 0.03),
('12sas', 22, '2026-01-08 18:13:00', 6.00, 'chat gpt mini', '2025-12-21', 5.00),
('REG001', 1, '2025-12-01 09:00:00', 105.50, 'ModelA', '2025-12-01', 95.25),
('REG002', 2, '2025-12-01 09:05:00', 210.75, 'ModelB', '2025-12-01', 92.10),
('REG003', 3, '2025-12-01 09:10:00', 315.20, 'ModelC', '2025-12-01', 88.50),
('REG004', 4, '2025-12-01 09:15:00', 415.00, 'ModelA pro version', '0000-00-00', 90.00),
('REG005', 5, '2025-12-01 09:20:00', 525.30, 'ModelB', '2025-12-01', 94.75),
('REG006', 6, '2025-12-01 09:25:00', 130.00, 'ModelC', '2025-12-01', 91.60),
('REG007', 7, '2025-12-01 09:30:00', 235.50, 'ModelA', '2025-12-01', 89.90),
('REG008', 8, '2025-12-01 09:35:00', 340.80, 'ModelB', '2025-12-01', 93.20),
('REG009', 9, '2025-12-01 09:40:00', 445.60, 'ModelC', '2025-12-01', 87.45),
('REG010', 10, '2025-12-01 09:45:00', 550.00, 'ModelA', '2025-12-01', 96.10),
('REG011', 11, '2025-12-01 09:50:00', 120.40, 'ModelB', '2025-12-01', 92.55),
('REG013', 13, '2025-12-01 10:00:00', 330.20, 'ModelA', '2025-12-01', 90.50),
('REG014', 14, '2025-12-01 10:05:00', 435.10, 'ModelB', '2025-12-01', 94.00),
('REG015', 15, '2025-12-01 10:10:00', 540.30, 'ModelC', '2025-12-01', 91.20),
('REG016', 16, '2025-12-01 10:15:00', 115.00, 'ModelA', '2025-12-01', 89.75),
('REG017', 17, '2025-12-01 10:20:00', 220.50, 'ModelB', '2025-12-01', 93.10),
('REG018', 18, '2025-12-01 10:25:00', 325.80, 'ModelC', '2025-12-01', 87.95),
('REG019', 19, '2025-12-01 10:30:00', 430.60, 'ModelA', '2025-12-01', 95.50),
('REG020', 20, '2025-12-01 10:35:00', 535.00, 'ModelB', '2025-12-01', 92.80),
('REG021', 21, '2025-12-01 10:40:00', 125.40, 'ModelC', '2025-12-01', 90.60),
('REG023', 23, '2025-12-01 10:50:00', 335.20, 'ModelB', '2025-12-01', 91.35),
('REG024', 24, '2025-12-01 10:55:00', 440.10, 'ModelC', '2025-12-01', 93.70),
('REG025', 25, '2025-12-01 11:00:00', 545.30, 'ModelA', '2025-12-01', 89.50);

-- --------------------------------------------------------

--
-- Table structure for table `price_history`
--

CREATE TABLE `price_history` (
  `registrationNumber` varchar(100) NOT NULL,
  `stockId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `open` decimal(15,2) DEFAULT NULL,
  `close` decimal(15,2) DEFAULT NULL,
  `high` decimal(15,2) DEFAULT NULL,
  `low` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `price_history`
--

INSERT INTO `price_history` (`registrationNumber`, `stockId`, `timestamp`, `open`, `close`, `high`, `low`) VALUES
('21', 11, '2025-12-12 10:48:00', 0.02, 0.01, 0.04, 11.00),
('222', 45, '2026-01-01 18:16:00', 0.03, 0.03, 0.03, 0.02),
('232', 12, '2025-12-19 19:03:00', 0.02, 0.02, 0.02, 0.02),
('etrhsdfb', 0, '2025-12-13 18:09:00', 0.03, 0.02, 0.02, 0.04),
('REG001', 101, '2025-12-01 09:00:00', 50.00, 50.25, 51.00, 49.75),
('REG002', 102, '2025-12-01 09:05:00', 120.50, 120.75, 121.20, 119.80),
('REG003', 103, '2025-12-01 09:10:00', 35.20, 35.50, 36.00, 34.80),
('REG004', 104, '2025-12-01 09:15:00', 80.00, 80.10, 81.00, 79.50),
('REG005', 105, '2025-12-01 09:20:00', 199.50, 200.00, 202.00, 198.75),
('REG006', 106, '2025-12-01 09:25:00', 60.25, 60.50, 61.00, 59.80),
('REG007', 107, '2025-12-01 09:30:00', 45.00, 45.30, 46.00, 44.50),
('REG008', 108, '2025-12-01 09:35:00', 15.50, 15.75, 16.00, 15.20),
('REG009', 109, '2025-12-01 09:40:00', 95.00, 95.20, 96.00, 94.50),
('REG010', 110, '2025-12-01 09:45:00', 30.00, 30.00, 30.50, 29.75),
('REG011', 111, '2025-12-01 09:50:00', 55.00, 55.10, 56.00, 54.50),
('REG012', 112, '2025-12-01 09:55:00', 75.00, 75.50, 76.00, 74.80),
('REG013', 113, '2025-12-01 10:00:00', 40.00, 40.00, 41.00, 39.50),
('REG014', 114, '2025-12-01 10:05:00', 85.00, 85.25, 86.00, 84.50),
('REG015', 115, '2025-12-01 10:10:00', 25.50, 25.75, 26.00, 25.00);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `reportId` int(11) NOT NULL,
  `auditName` varchar(255) DEFAULT NULL,
  `auditDate` date DEFAULT NULL,
  `findingsSummary` text DEFAULT NULL,
  `registrationNumber` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`reportId`, `auditName`, `auditDate`, `findingsSummary`, `registrationNumber`) VALUES
(0, '2342', '2025-12-17', 'dsd', '232'),
(1, 'Audit Alpha', '2025-11-01', 'No major issues found.', 'REG001'),
(2, 'Audit Beta', '2025-11-05', 'Minor discrepancies in records.', 'REG002'),
(3, 'Audit Gamma', '2025-11-08', 'All compliance requirements met.', 'REG003'),
(4, 'Audit Delta', '2025-11-10', 'Some procedural improvements needed.', 'REG004'),
(5, 'Audit Epsilon', '2025-11-12', 'Financial statements verified successfully.', 'REG005'),
(6, 'Audit Zeta', '2025-11-15', 'Internal controls satisfactory.', 'REG006'),
(7, 'Audit Eta', '2025-11-18', 'Minor reporting delays observed.', 'REG007'),
(8, 'Audit Theta', '2025-11-20', 'All transactions properly documented.', 'REG008'),
(9, 'Audit Iota', '2025-11-22', 'Some accounting adjustments recommended.', 'REG009'),
(10, 'Audit Kappa', '2025-11-25', 'Compliance with regulations confirmed.', 'REG010'),
(11, 'Audit Lambda', '2025-11-28', 'No significant risks identified.', 'REG011'),
(12, 'Audit Mu', '2025-11-30', 'Minor procedural issues noted.', 'REG012'),
(13, 'Audit Nu', '2025-12-01', 'Financial reporting accurate.', 'REG013'),
(14, 'Audit Xi', '2025-12-02', 'Recommendations for improving efficiency.', 'REG014'),
(15, 'Audit Omicron', '2025-12-03', 'Internal controls need minor updates.', 'REG015'),
(415878, '232', '2025-12-27', 'dsd', '232');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `registrationNumber` varchar(100) DEFAULT NULL,
  `stockId` varchar(100) NOT NULL,
  `totalShares` int(11) DEFAULT NULL,
  `currentPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`registrationNumber`, `stockId`, `totalShares`, `currentPrice`) VALUES
('REG001', '101', 1000, 50.25),
('REG002', '102', 500, 120.75),
('REG003', '103', 2000, 35.50),
('REG004', '104', 1500, 80.10),
('REG005', '105', 750, 200.00),
('REG006', '106', 1200, 60.50),
('REG007', '107', 900, 45.30),
('REG009', '109', 1800, 95.20),
('REG010', '110', 2500, 30.00),
('REG011', '111', 1100, 55.10),
('REG012', '112', 600, 75.50),
('REG013', '113', 1400, 40.00),
('REG014', '114', 1600, 85.25),
('REG015', '115', 2000, 25.75),
('21', '201', 800, 90.00),
('232', '232', 4, 4.00),
('C2938', 'S1102', 4, 5.00),
('C4850', 'S2432', 231, 500.00),
('C8403', 'S2671', 3232, 3232.00),
('C4850', 'S3741', 123, 456.00),
('C2938', 'S4719', 2356, 10.00);

-- --------------------------------------------------------

--
-- Table structure for table `stocks_transaction`
--

CREATE TABLE `stocks_transaction` (
  `transactionId` varchar(50) NOT NULL,
  `timestamp` datetime NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `stockId` varchar(100) DEFAULT NULL,
  `iUserId` int(11) NOT NULL,
  `registrationNumber` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks_transaction`
--

INSERT INTO `stocks_transaction` (`transactionId`, `timestamp`, `amount`, `stockId`, `iUserId`, `registrationNumber`) VALUES
('FRHGFSB', '2025-12-11 20:29:00', 212.00, 'FTR343', 121, 'D21'),
('T1765361458844', '2025-12-10 10:10:58', 5.00, '105', 19, '5'),
('T1765361475354', '2025-12-10 10:11:15', 7.00, '106', 19, '6'),
('T1765361488778', '2025-12-10 10:11:28', 6.00, '108', 19, '8'),
('T1765361533666', '2025-12-10 10:12:13', 4.00, '106', 16, '6'),
('T1765368889616', '2025-12-10 12:14:49', 120.00, '102', 15, '2'),
('T1765368948559', '2025-12-10 12:15:48', 234.00, '109', 1112, '9'),
('T1765371323487', '2025-12-10 12:55:23', 12.00, '101', 15, '1'),
('T1765371374485', '2025-12-10 12:56:14', 345.00, '104', 1113, '4'),
('T1766160650106', '2025-12-19 16:10:50', 17.00, '101', 15, 'REG001'),
('T1766240794745', '2025-12-20 14:26:34', 8.00, '113', 15, 'REG013'),
('T1766240812001', '2025-12-20 14:26:52', 33.00, 'S3741', 15, 'C4850');

-- --------------------------------------------------------

--
-- Table structure for table `trade`
--

CREATE TABLE `trade` (
  `tradeId` int(11) NOT NULL,
  `buyerId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `assetType` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trade`
--

INSERT INTO `trade` (`tradeId`, `buyerId`, `sellerId`, `amount`, `date`, `assetType`, `status`) VALUES
(0, 123, 112, 3.00, '2025-12-13 18:29:00', '1SA', 'closed'),
(1, 1, 2, 5000.50, '2025-12-01 09:00:00', 'Stock', 'Completed'),
(2, 3, 4, 12000.75, '2025-12-01 09:15:00', 'Stock', 'Pending'),
(3, 5, 6, 7500.00, '2025-12-01 09:30:00', 'Bond', 'Completed'),
(4, 7, 8, 15000.25, '2025-12-01 09:45:00', 'Stock', 'Completed'),
(5, 9, 10, 2000.00, '2025-12-01 10:00:00', 'ETF', 'Pending'),
(6, 11, 12, 8500.50, '2025-12-01 10:15:00', 'Stock', 'Completed'),
(7, 13, 14, 4300.75, '2025-12-01 10:30:00', 'Bond', 'Completed'),
(8, 15, 1, 9700.00, '2025-12-01 10:45:00', 'Stock', 'Pending'),
(9, 2, 3, 5600.25, '2025-12-01 11:00:00', 'ETF', 'Completed'),
(10, 4, 5, 13200.50, '2025-12-01 11:15:00', 'Stock', 'Completed'),
(11, 6, 7, 7100.00, '2025-12-01 11:30:00', 'Bond', 'Pending'),
(12, 8, 9, 8800.25, '2025-12-01 11:45:00', 'Stock', 'Completed'),
(13, 10, 11, 5400.75, '2025-12-01 12:00:00', 'ETF', 'Completed'),
(312741, 123, 121, 3.00, '2025-12-12 18:52:00', 'sports', 'pending'),
(823211, 343, 0, 3.00, '2025-12-17 19:03:00', 'dd', 'open'),
(2147483647, 121, 121, 11.00, '2025-12-19 20:40:00', 'saa', 'closed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `role` enum('admin','investor','companyRep') NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `pass`, `role`, `contact_info`) VALUES
(1, 'admin@example.com', 'adminpass', 'admin', NULL),
(4, 'fscds', 'sdsc', 'investor', 'csfds'),
(5, 'sdsxs', 'sdsxs', 'investor', 'scsc'),
(11, 'rafi@w.com', 'wdww', '', '2dww'),
(15, 'rafi', '5678', 'investor', NULL),
(16, 'tonmoy', '5678', 'investor', NULL),
(18, 'hello', '123', 'companyRep', NULL),
(19, 'khan', '990', 'investor', NULL),
(90, 'scs', 'cscs', '', 'dsd'),
(1111, 'esd', '232', '', ''),
(1112, 'new', '123', 'investor', NULL),
(1113, 'king', '123', 'investor', NULL),
(1114, 'miya', '123', 'investor', NULL),
(1115, 'hassan', '123', 'companyRep', NULL),
(1116, 'sss', '2342', 'companyRep', NULL),
(1118, 'dasedv', 'efecvda', 'investor', NULL),
(1119, 'tony', '123', 'companyRep', NULL),
(1120, 'ahmed123', '234', 'companyRep', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`registrationNumber`);

--
-- Indexes for table `company_representative`
--
ALTER TABLE `company_representative`
  ADD PRIMARY KEY (`rUserId`),
  ADD KEY `registrationNumber` (`registrationNumber`);

--
-- Indexes for table `fraud`
--
ALTER TABLE `fraud`
  ADD PRIMARY KEY (`alertId`);

--
-- Indexes for table `institute`
--
ALTER TABLE `institute`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `institute_representative`
--
ALTER TABLE `institute_representative`
  ADD PRIMARY KEY (`instRepUserId`),
  ADD KEY `instId` (`instId`);

--
-- Indexes for table `investor`
--
ALTER TABLE `investor`
  ADD PRIMARY KEY (`iUserId`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `prediction`
--
ALTER TABLE `prediction`
  ADD PRIMARY KEY (`registrationNumber`,`stockId`,`timestamp`);

--
-- Indexes for table `price_history`
--
ALTER TABLE `price_history`
  ADD PRIMARY KEY (`registrationNumber`,`stockId`,`timestamp`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportId`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`stockId`);

--
-- Indexes for table `stocks_transaction`
--
ALTER TABLE `stocks_transaction`
  ADD PRIMARY KEY (`transactionId`);

--
-- Indexes for table `trade`
--
ALTER TABLE `trade`
  ADD PRIMARY KEY (`tradeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1121;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `company_representative`
--
ALTER TABLE `company_representative`
  ADD CONSTRAINT `company_representative_ibfk_1` FOREIGN KEY (`registrationNumber`) REFERENCES `company` (`registrationNumber`);

--
-- Constraints for table `institute_representative`
--
ALTER TABLE `institute_representative`
  ADD CONSTRAINT `institute_representative_ibfk_1` FOREIGN KEY (`instId`) REFERENCES `institute` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
