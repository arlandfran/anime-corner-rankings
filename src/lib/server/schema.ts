import { integer, real, sqliteTable } from "drizzle-orm/sqlite-core";

export const rankings = sqliteTable("ranking", {
  id: integer("id").primaryKey(),
  seasonId: integer("season_id").notNull(),
  rank: integer("rank").notNull(),
  anilistId: integer("anilist_id").notNull(),
  votes: real("votes").notNull(),
});
