<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ year, season, week } = $page.params);
  $: ({ rankings } = data);
</script>

<h1 class="text-center capitalize">{season} {year} - week {week}</h1>

<ol class="text-center">
  {#each rankings as ranking}
    <li>
      {ranking.rank}. {ranking.anilistId}
      {ranking.previousRank}
      {ranking.rankDifference}
      {ranking.votes}
      {ranking.votesDifference}
    </li>
  {/each}
</ol>
