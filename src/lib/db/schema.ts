import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { index } from "drizzle-orm/sqlite-core";

export const anime = sqliteTable("anime", {
  animeId: integer("anime_id").primaryKey(),
  title: text("title").notNull(),
});

export const weeklyRanking = sqliteTable(
  "weekly_ranking",
  {
    animeId: integer("anime_id")
      .notNull()
      .references(() => anime.animeId),
    year: integer("year").notNull(),
    season: text("season").notNull(),
    week: integer("week").notNull(),
    rank: integer("rank").notNull(),
    rankDelta: integer("rank_delta").notNull().default(0),
    votes: real("votes").notNull(),
    votesDelta: real("votes_delta").notNull().default(0.0),
  },
  (table) => [
    primaryKey({
      columns: [table.animeId, table.year, table.season, table.week],
    }),
    index("idx_year_season_week").on(table.year, table.season, table.week),
  ]
);
