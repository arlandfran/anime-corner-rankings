import { db } from "$lib/server/database";
import { ranking } from "$lib/server/schema";
import { asc, eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

interface PageParams {
  year: string;
  season: string;
  week: string;
}

function parseParams(params: PageParams) {
  const { year, season, week } = params;
  switch (season) {
    case "winter":
      return parseInt(year.substring(2) + "1" + week);
    case "spring":
      return parseInt(year.substring(2) + "2" + week);
    case "summer":
      return parseInt(year.substring(2) + "3" + week);
    case "fall":
      return parseInt(year.substring(2) + "4" + week);
    default:
      throw new Error(
        `Invalid params. Season must be winter, spring, fall, summer - season: ${season}`,
      );
  }
}

async function getRankings(seasonId: number) {
  const query = db
    .select({
      rank: ranking.rank,
      anilistId: ranking.anilistId,
      votes: ranking.votes,
    })
    .from(ranking)
    .where(eq(ranking.seasonId, seasonId))
    .as("query");

  const previous = db
    .select({
      rank: ranking.rank,
      anilistId: ranking.anilistId,
      votes: ranking.votes,
    })
    .from(ranking)
    .where(
      eq(
        ranking.seasonId,
        // this one liner converts 231209 to 23129 when decrementing seasonId
        seasonId % 10 === 0 ? parseInt(seasonId.toString().slice(0, -2) + "9") : seasonId - 1,
      ),
    )
    .as("previous");

  const prepared = db
    .select({
      rank: query.rank,
      anilistId: query.anilistId,
      votes: query.votes,
      previousRank: sql<number>`coalesce(previous.rank, null)`,
      rankDifference: sql<number>`coalesce(previous.rank - query.rank, null)`,
      votesDifference: sql<number>`coalesce(round(query.votes - previous.votes,2), null)`,
    })
    .from(query)
    .leftJoin(previous, eq(query.anilistId, previous.anilistId))
    .orderBy(asc(query.rank))
    .limit(10)
    .prepare();

  return await prepared.all();
}

export const load: PageServerLoad = async ({ params }) => {
  const seasonId = parseParams(params);
  const rankings = await getRankings(seasonId);

  return { rankings: rankings };
};
