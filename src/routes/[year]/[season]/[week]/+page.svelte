<script lang="ts">
  import { page } from "$app/stores";
  import AnimeList from "$lib/components/anime-list.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ year, season, week } = $page.params);
  $: ({ rankings } = data);
</script>

<h1 class="text-center text-lg font-semibold capitalize tracking-tight [text-wrap:balance]">
  {season}
  {year} anime rankings - week {week}
</h1>

<AnimeList {rankings} week={parseInt(week)} />
