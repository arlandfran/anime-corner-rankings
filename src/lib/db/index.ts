import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { anime, weeklyRanking } from "./schema";
import { eq, and, asc } from "drizzle-orm";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);

export const getWeeklyRankings = async (
  year: number,
  season: string,
  week: number
) => {
  const result = await db
    .select({
      animeId: weeklyRanking.animeId,
      year: weeklyRanking.year,
      season: weeklyRanking.season,
      week: weeklyRanking.week,
      rank: weeklyRanking.rank,
      rankDelta: weeklyRanking.rankDelta,
      votes: weeklyRanking.votes,
      votesDelta: weeklyRanking.votesDelta,
      animeTitle: anime.title,
    })
    .from(weeklyRanking)
    .leftJoin(anime, eq(weeklyRanking.animeId, anime.animeId))
    .where(
      and(
        eq(weeklyRanking.year, year),
        eq(weeklyRanking.season, season),
        eq(weeklyRanking.week, week)
      )
    )
    .orderBy(asc(weeklyRanking.rank))
    .limit(10);

  return result;
};
