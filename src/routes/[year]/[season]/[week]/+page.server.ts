import { getRankings } from "$lib/server/database";
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

export const load: PageServerLoad = async ({ params }) => {
  const seasonId = parseParams(params);
  const rankings = await getRankings(seasonId);

  return { rankings: rankings };
};
