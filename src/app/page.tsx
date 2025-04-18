import { getWeeklyRankings } from "@/lib/db";

export default async function Home() {
  const latestRanking = await getWeeklyRankings(2023, "fall", 1);
  return (
    <main>
      {latestRanking.map((anime) => (
        <div key={anime.animeId} className="flex gap-4">
          <h2>{anime.animeTitle}</h2>
          <p>Rank: {anime.rank}</p>
          <p>Votes: {anime.votes}</p>
          <p>Rank Delta: {anime.rankDelta}</p>
          <p>Votes Delta: {anime.votesDelta}</p>
        </div>
      ))}
    </main>
  );
}
