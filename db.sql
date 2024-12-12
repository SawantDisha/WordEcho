-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 09, 2024 at 05:55 PM
-- Server version: 9.0.1
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `sub_title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` date DEFAULT NULL,
  `author_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `sub_title`, `content`, `date`, `author_id`, `created_at`) VALUES
(2, 'My First Blog', '', 'This is something in here', NULL, 1, '2024-12-08 15:17:29'),
(3, 'Test', 'Test', 'Test', NULL, 1, '2024-12-08 18:12:11'),
(4, 'Some More Here', 'yes', 'Here', NULL, 1, '2024-12-08 18:12:58'),
(5, 'Yes this is the third one', 'Good to be here', 'Some content', NULL, 1, '2024-12-08 18:45:52'),
(7, 'This is new blog', 'yes', 'content', NULL, 2, '2024-12-09 07:22:23'),
(8, 'Test Blog', 'yes', '<p><span style=\"background-color: initial;\">Posting the same blog post on multiple sites can have both benefits and drawbacks, primarily related to search engine optimization (SEO) and audience reach.</span></p><p><strong style=\"background-color: initial;\">Potential Benefits:</strong></p><ol><li><strong style=\"background-color: initial;\">Increased Visibility</strong><span style=\"background-color: initial;\">: Sharing your content across multiple platforms can help you reach a broader audience, potentially driving more traffic to your blog.</span></li><li><strong style=\"background-color: initial;\">Backlinks</strong><span style=\"background-color: initial;\">: If other sites link back to your original post, it can enhance your site\'s authority in search engines.</span></li></ol><p><strong style=\"background-color: initial;\">Potential Drawbacks:</strong></p><ol><li><strong style=\"background-color: initial;\">Duplicate Content Issues</strong><span style=\"background-color: initial;\">: Search engines like Google may penalize duplicate content, which can lead to lower rankings for your post. They</span></li></ol><p><br></p>', NULL, 2, '2024-12-09 08:16:16'),
(9, 'This is a new blog', 'Get more this in here', '<p>Now make it correct</p><p><br></p><p>and more details etc</p>', '2024-12-09', 2, '2024-12-09 17:05:58'),
(10, 'Test Blog', 'Test', '<p>Test</p>', '2024-12-09', 2, '2024-12-09 17:14:22');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `content` text NOT NULL,
  `blog_id` int NOT NULL,
  `author_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `blog_id`, `author_id`, `created_at`) VALUES
(2, 'some more comment', 8, 2, '2024-12-09 08:34:36'),
(3, 'This is new comment now', 8, 2, '2024-12-09 08:37:34'),
(4, 'some more', 8, 2, '2024-12-09 08:37:39'),
(5, 'more here', 8, 2, '2024-12-09 16:59:33'),
(6, 'Some more comment', 2, 2, '2024-12-09 17:04:31'),
(7, 'Some comment', 9, 2, '2024-12-09 17:06:30'),
(8, 'It my comment', 2, 1, '2024-12-09 17:32:53'),
(9, 'vv', 10, 1, '2024-12-09 17:51:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Danish Shaikh', 'shaikh.danish4444@gmail.com', '$2b$12$nScvEdRXJsnTTUkmgoNF8u.sm0H3n9Zz5X4LgWNTYSrnwn1zByjK2', '2024-12-08 14:31:05'),
(2, 'New User', 'user@gmail.com', '$2b$12$QNW2yuulZDm7eTnjMezZJ.1VF6VyR4V1Rel4mQrvzXGIelAnSx/4O', '2024-12-08 18:47:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
