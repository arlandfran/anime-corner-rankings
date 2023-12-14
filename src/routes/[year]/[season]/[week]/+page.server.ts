import { db } from "$lib/server/database";
import { ranking } from "$lib/server/schema";
import { count } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [{ value }] = await db.select({ value: count() }).from(ranking);

  return { count: value };
};
