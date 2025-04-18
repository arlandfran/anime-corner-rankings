import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { anime, weeklyRanking } from "./schema";
import { eq, and, asc, desc, sql } from "drizzle-orm";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);

export const getLatestWeek = async () => {
  const result = await db
    .select({
      year: weeklyRanking.year,
      season: weeklyRanking.season,
      week: weeklyRanking.week,
    })
    .from(weeklyRanking)
    .orderBy(
      desc(weeklyRanking.year),
      desc(
        sql.raw(
          "CASE season WHEN 'winter' THEN 1 WHEN 'spring' THEN 2 WHEN 'summer' THEN 3 WHEN 'fall' THEN 4 END"
        )
      ),
      desc(weeklyRanking.week)
    )
    .limit(1);

  return result[0];
};

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
