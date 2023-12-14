<script lang="ts">
  import type { Ranking } from "$lib/server/database";
  import { Minus, TriangleDown, TriangleUp } from "svelte-radix";

  export let rankings: Ranking[];
  export let week: number;
</script>

<ol class="flex w-full flex-col gap-4">
  {#each rankings as ranking}
    <li
      class="flex h-full w-full items-center justify-between rounded-lg border bg-background bg-cover p-2 text-foreground shadow-sm min-[425px]:gap-4"
      style={ranking.bannerImage !== null
        ? `
        background-image: linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${ranking.bannerImage})
      `
        : undefined}
    >
      <div class="text-outline px-4 text-sm font-bold">{ranking.rank}</div>
      <div class="text-outline grow px-2 text-left text-sm font-medium [text-wrap:balance]">
        <a
          href={`https://anilist.co/anime/${ranking.anilistId}`}
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          {#if ranking.title.english !== null}
            {ranking.title.english}
          {:else}
            {ranking.title.romaji}
          {/if}
        </a>
      </div>
      <div
        class="text-outline grid h-[5.5rem] min-w-[6rem] grid-cols-1 gap-2 rounded bg-gradient-to-br from-muted/50 to-muted px-4 py-2 text-[10px] sm:h-fit sm:min-w-[12rem] sm:grid-cols-2 sm:gap-0"
      >
        <div class="flex flex-col items-center justify-center gap-1">
          {#if ranking.rankDifference > 0}
            <div class="flex items-center font-semibold">
              <TriangleUp class="text-emerald-500" size={15} stroke="black" strokeWidth={0.5} />
              {ranking.rankDifference}
            </div>
            <div class="text-[8px] font-medium uppercase text-foreground">
              From rank {ranking.previousRank}
            </div>
          {:else if ranking.rankDifference < 0}
            <div class="flex items-center font-semibold">
              <TriangleDown class="text-red-500" size={15} stroke="black" strokeWidth={0.5} />
              {Math.abs(ranking.rankDifference)}
            </div>
            <div class="text-[8px] font-medium uppercase text-foreground">
              From rank {ranking.previousRank}
            </div>
          {:else if ranking.rankDifference === 0}
            <div class="flex items-center">
              <Minus class="text-amber-500" size={15} />
            </div>
            <div class="text-[8px] font-medium uppercase text-foreground">Same rank</div>
          {:else if (ranking.previousRank === null && week === 1) || (ranking.previousRank === null && week == 2)}
            <div class="flex items-center">
              <Minus class="text-amber-500" size={15} />
            </div>
            <div class="text-[8px] font-medium uppercase text-foreground">New entry</div>
          {:else if ranking.previousRank === null && week > 2}
            <div class="flex items-center">
              <Minus class="text-amber-500" size={15} />
            </div>
            <div class="text-[8px] font-medium uppercase text-foreground">Re-entry</div>
          {/if}
        </div>
        <div class="flex flex-col items-center justify-center gap-1">
          <div class="relative left-1 font-semibold">{ranking.votes}%</div>
          {#if ranking.votesDifference > 0}
            <div class="text-[8px] font-medium uppercase text-emerald-500">
              + {ranking.votesDifference}% gain
            </div>
          {:else if ranking.votesDifference < 0}
            <div class="text-[8px] font-medium uppercase text-red-500">
              - {Math.abs(ranking.votesDifference)}% drop
            </div>
          {/if}
        </div>
      </div>
    </li>
  {/each}
</ol>
