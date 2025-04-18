import { getLatestWeek, getWeeklyRankings } from "@/lib/db";
import { RankList } from "@/components/rank-list";

export default async function Home() {
  const { year, season, week } = await getLatestWeek();
  const latestRankings = await getWeeklyRankings(year, season, week);
  return (
    <main>
      <RankList rankings={latestRankings} week={week} />
    </main>
  );
}
