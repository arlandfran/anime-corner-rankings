import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "$env/static/private";
import { createClient } from "@libsql/client";
import { asc, count, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { rankings } from "./schema";

export type Ranking = Awaited<ReturnType<typeof getRankings>>[0];

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client);

export async function getTotalPages(seasonId: number) {
  const [{ value }] = await db
    .select({ value: count() })
    .from(rankings)
    .where(eq(rankings.seasonId, seasonId));
  return Math.ceil(value / 10);
}

export async function getRankings(seasonId: number, offset: number) {
  const query = db
    .select({
      rank: rankings.rank,
      anilistId: rankings.anilistId,
      votes: rankings.votes,
    })
    .from(rankings)
    .where(eq(rankings.seasonId, seasonId))
    .as("query");

  const previous = db
    .select({
      rank: rankings.rank,
      anilistId: rankings.anilistId,
      votes: rankings.votes,
    })
    .from(rankings)
    .where(
      eq(
        rankings.seasonId,
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
    .offset(offset)
    .prepare();

  const data = await prepared.all();
  const media = await getMedia(data.map((item) => item.anilistId));
  // return merged array of rankings from database
  // and the corresonding media from api
  return data.map((item) => ({
    ...item,
    ...media[`media${item.anilistId}`],
  }));
}

interface Media {
  title: {
    english: string;
    romaji: string;
  };
  bannerImage: string;
}

async function getMedia(ids: number[]): Promise<{ [key: string]: Media }> {
  // construct api query
  let query = "";

  for (const i in ids) {
    query += `
			media${ids[i]}: Media(id: ${ids[i]}, type: ANIME) {
				title {
					english
					romaji
				}
        bannerImage
			}`;
  }

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: "{" + query + "}",
    }),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const result: {
    data: {
      [key: string]: Media;
    };
    errors?: { message: string }[];
  } = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((error) => error.message).join("\n"));
  }

  return result.data;
}
