import { getRankings, getSeasonCount } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";
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

export const load: PageServerLoad = async ({ url, params }) => {
  const { year, season, week } = params;
  const seasonId = parseParams(params);
  const page = parseInt(url.searchParams.get("page") as string);
  const { totalPages, count } = await getSeasonCount(seasonId);
  if (page < 1) {
    redirect(307, `/${year}/${season}/${week}`);
  } else if (page > totalPages) {
    redirect(307, `/${year}/${season}/${week}`);
  }
  const offset = (page - 1) * 10;
  const rankings = await getRankings(seasonId, offset);

  return { rankings: rankings, count: count };
};
