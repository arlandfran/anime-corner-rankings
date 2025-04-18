import { cn } from "@/lib/utils";
import { type Ranking } from "@/lib/db";
import {
  TriangleUpIcon,
  TriangleDownIcon,
  DashIcon,
} from "@radix-ui/react-icons";

// Types
type RankingComponentProps = {
  ranking: Ranking;
  week: number;
};

// Constants
const deltaColors = {
  positive: "text-emerald-500",
  negative: "text-red-500",
  neutral: "text-amber-500",
} as const;

// Helper Functions
function getRankDeltaDetails({ ranking, week }: RankingComponentProps) {
  const { rankDelta, rank } = ranking;

  if (rankDelta === 0) {
    return {
      icon: <DashIcon className={deltaColors.neutral} />,
      count: null,
      label: week <= 2 ? (week === 1 ? "New entry" : "Re-entry") : "Same rank",
    };
  }

  const isPositive = rankDelta > 0;
  const Icon = isPositive ? TriangleUpIcon : TriangleDownIcon;
  const color = isPositive ? deltaColors.positive : deltaColors.negative;
  const count = Math.abs(rankDelta);
  const previousRank = rank + (isPositive ? count : -count);

  return {
    icon: <Icon className={color} />,
    count,
    label: `From rank ${previousRank}`,
  };
}

function getVotesDelta(votesDelta: number) {
  if (votesDelta === 0) return null;

  const isPositive = votesDelta > 0;
  const absoluteDelta = Math.abs(votesDelta);

  return {
    text: `${isPositive ? "+" : "-"}${absoluteDelta}% ${isPositive ? "gain" : "drop"}`,
    className: isPositive ? deltaColors.positive : deltaColors.negative,
  };
}

// Utility Components
function DeltaWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {children}
    </div>
  );
}

function DeltaText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-[8px] font-medium uppercase", className)}>
      {children}
    </div>
  );
}

// Main Components
function RankDelta({ ranking, week }: RankingComponentProps) {
  const { icon, count, label } = getRankDeltaDetails({ ranking, week });

  return (
    <DeltaWrapper>
      <div className="flex items-center font-semibold">
        {icon}
        {count !== null && <span className="ml-1">{count}</span>}
      </div>
      <DeltaText>{label}</DeltaText>
    </DeltaWrapper>
  );
}

function Votes({ ranking }: Pick<RankingComponentProps, "ranking">) {
  const { votes, votesDelta } = ranking;
  const delta = getVotesDelta(votesDelta);

  return (
    <DeltaWrapper>
      <div className="relative left-1 font-semibold">{votes}%</div>
      {delta && <DeltaText className={delta.className}>{delta.text}</DeltaText>}
    </DeltaWrapper>
  );
}

function RankingDetails({ ranking, week }: RankingComponentProps) {
  return (
    <div className="from-muted/50 to-muted text-foreground grid h-[5.5rem] min-w-[6rem] gap-2 rounded bg-gradient-to-br px-4 py-2 text-[10px] sm:h-fit sm:min-w-[12rem] sm:grid-cols-2 sm:gap-0">
      <RankDelta ranking={ranking} week={week} />
      <Votes ranking={ranking} />
    </div>
  );
}

function RankListItem({ ranking, week }: RankingComponentProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border p-2 text-sm @md:gap-4">
      <div className="px-4 font-bold">{ranking.rank}</div>
      <div className="grow px-2 font-medium text-balance">
        <a
          href={`https://anilist.co/anime/${ranking.animeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {ranking.animeTitle}
        </a>
      </div>
      <RankingDetails ranking={ranking} week={week} />
    </li>
  );
}

export function RankList({
  rankings,
  week,
}: {
  rankings: Ranking[];
  week: number;
}) {
  return (
    <ol className="@container flex w-full flex-col gap-4">
      {rankings.map((ranking) => (
        <RankListItem key={ranking.animeId} ranking={ranking} week={week} />
      ))}
    </ol>
  );
}
