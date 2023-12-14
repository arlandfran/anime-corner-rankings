import { getLatest } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const { year, season, week } = getLatest();
  throw redirect(308, `/${year}/${season}/${week}`);
};
