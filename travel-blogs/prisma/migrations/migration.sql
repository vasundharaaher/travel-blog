-- CreateTable
CREATE TABLE `travel-blog` (
    `blog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(45) NOT NULL,
    `review` VARCHAR(200) NOT NULL,
    `user_id` INTEGER NULL,
    `pictures` VARCHAR(500) NOT NULL,
    `cost` INTEGER NOT NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`blog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `profile_pic` VARCHAR(200) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(200) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(200) NOT NULL,
    `receipt` VARCHAR(200) NULL,
    `status` ENUM('created', 'attempted', 'paid') NULL,
    `razorpay_payment_id` VARCHAR(200) NULL,
    `razorpay_signature` VARCHAR(200) NULL,
    `details` VARCHAR(200) NULL,
    `blog_id` INTEGER NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `travel-blog` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

