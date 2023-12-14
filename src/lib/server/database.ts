import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "$env/static/private";
import type { UnwrapArray } from "$lib/utils";
import { createClient } from "@libsql/client";
import { asc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { ranking } from "./schema";

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client);

export async function getRankings(seasonId: number) {
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
export type Ranking = UnwrapArray<Awaited<ReturnType<typeof getRankings>>>;
