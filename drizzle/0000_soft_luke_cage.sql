CREATE TABLE `anime` (
	`anime_id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weekly_ranking` (
	`anime_id` integer NOT NULL,
	`year` integer NOT NULL,
	`season` text NOT NULL,
	`week` integer NOT NULL,
	`rank` integer NOT NULL,
	`ranking_delta` integer DEFAULT 0 NOT NULL,
	`votes` real NOT NULL,
	`votes_delta` real DEFAULT 0 NOT NULL,
	PRIMARY KEY(`anime_id`, `year`, `season`, `week`),
	FOREIGN KEY (`anime_id`) REFERENCES `anime`(`anime_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_year_season_week` ON `weekly_ranking` (`year`,`season`,`week`);