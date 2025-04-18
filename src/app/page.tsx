import {
  TriangleUpIcon,
  TriangleDownIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import { getLatestWeek, getWeeklyRankings } from "@/lib/db";

export default async function Home() {
  const { year, season, week } = await getLatestWeek();
  const latestRanking = await getWeeklyRankings(year, season, week);
  return (
    <main>
      <ol className="flex w-full flex-col gap-4">
        {latestRanking.map((ranking) => (
          <li
            key={ranking.animeId}
            className="flex h-full w-full items-center justify-between rounded-lg border bg-background bg-cover p-2 text-background shadow-sm dark:text-foreground min-[425px]:gap-4"
          >
            <div className="text-outline px-4 text-sm font-bold">
              {ranking.rank}
            </div>
            <div className="text-outline grow px-2 text-left text-sm font-medium [text-wrap:balance]">
              <a
                href={`https://anilist.co/anime/${ranking.animeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {ranking.animeTitle}
              </a>
            </div>
            <div className="dark:text-outline grid h-[5.5rem] min-w-[6rem] grid-cols-1 gap-2 rounded bg-gradient-to-br from-muted/50 to-muted px-4 py-2 text-[10px] text-foreground sm:h-fit sm:min-w-[12rem] sm:grid-cols-2 sm:gap-0">
              <div className="flex flex-col items-center justify-center gap-1">
                {ranking.rankDelta > 0 ? (
                  <>
                    <div className="flex items-center font-semibold">
                      <TriangleUpIcon
                        className="text-emerald-500"
                        stroke="black"
                        strokeWidth={0.5}
                      />
                      {ranking.rankDelta}
                    </div>
                    <div className="text-[8px] font-medium uppercase text-foreground">
                      From rank {ranking.rank + ranking.rankDelta}
                    </div>
                  </>
                ) : ranking.rankDelta < 0 ? (
                  <>
                    <div className="flex items-center font-semibold">
                      <TriangleDownIcon
                        className="text-red-500"
                        stroke="black"
                        strokeWidth={0.5}
                      />
                      {Math.abs(ranking.rankDelta)}
                    </div>
                    <div className="text-[8px] font-medium uppercase text-foreground">
                      From rank {ranking.rankDelta - ranking.rankDelta}
                    </div>
                  </>
                ) : ranking.rankDelta === 0 ? (
                  <>
                    <div className="flex items-center">
                      <MinusIcon className="text-amber-500" />
                    </div>
                    <div className="text-[8px] font-medium uppercase text-foreground">
                      Same rank
                    </div>
                  </>
                ) : ranking.rank + ranking.rankDelta === null && week <= 2 ? (
                  <>
                    <div className="flex items-center">
                      <MinusIcon className="text-amber-500" />
                    </div>
                    <div className="text-[8px] font-medium uppercase text-foreground">
                      {week === 1 ? "New entry" : "Re-entry"}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="relative left-1 font-semibold">
                  {ranking.votes}%
                </div>
                {ranking.votesDelta > 0 ? (
                  <div className="text-[8px] font-medium uppercase text-emerald-500">
                    + {ranking.votesDelta}% gain
                  </div>
                ) : ranking.votesDelta < 0 ? (
                  <div className="text-[8px] font-medium uppercase text-red-500">
                    - {Math.abs(ranking.votesDelta)}% drop
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
