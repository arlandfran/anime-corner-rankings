<script lang="ts">
  import { page } from "$app/stores";
  import AnimeList from "$lib/components/anime-list.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import { links } from "$lib/config/site";
  import { capitalize } from "$lib/utils";
  import { ChevronLeft, ChevronRight, DoubleArrowLeft, DoubleArrowRight } from "radix-icons-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ year, season, week } = $page.params);
  $: ({ rankings, totalPages } = data);
  $: currentPage = parseInt(($page.url.searchParams.get("page") as string) ?? 1);
  $: maxWeek = links[year][season];
</script>

<svelte:head>
  <title>
    {year}
    {capitalize(season)} Week {week} - Anime Corner Rankings
  </title>
  <description>
    The results of Week {week}
    {capitalize(season)}
    {year} from Anime Corner.
  </description>
</svelte:head>

<div class="flex items-center justify-center gap-2">
  <a
    href={`/${year}/${season}/${parseInt(week) - 1}`}
    class={buttonVariants({ variant: "ghost", size: "icon" })}
    aria-disabled={parseInt(week) === 1 ? true : false}
    tabIndex={parseInt(week) === 1 ? -1 : undefined}
  >
    <ChevronLeft />
    <span class="sr-only">Go to previous week</span>
  </a>
  <h1 class="text-center font-semibold capitalize tracking-tight [text-wrap:balance]">
    {season}
    {year} <span class="hidden xs:inline-block">anime rankings</span> - week {week}
  </h1>
  <a
    href={`/${year}/${season}/${parseInt(week) + 1}`}
    class={buttonVariants({ variant: "ghost", size: "icon" })}
    aria-disabled={parseInt(week) === maxWeek ? true : false}
    tabIndex={parseInt(week) === maxWeek ? -1 : undefined}
  >
    <ChevronRight />
    <span class="sr-only">Go to next week</span>
  </a>
</div>

<div class="flex items-center justify-center gap-2">
  <a
    href={`/${year}/${season}/${week}?page=1`}
    class={buttonVariants({ variant: "outline", size: "icon" })}
    aria-disabled={currentPage === 1 ? true : false}
    tabIndex={currentPage === 1 ? -1 : undefined}
  >
    <DoubleArrowLeft />
    <span class="sr-only">Go to first page</span>
  </a>
  <a
    href={`/${year}/${season}/${week}?page=${currentPage - 1}`}
    class={buttonVariants({ variant: "outline", size: "icon" })}
    aria-disabled={currentPage === 1 ? true : false}
    tabIndex={currentPage === 1 ? -1 : undefined}
  >
    <ChevronLeft />
    <span class="sr-only">Go to previous page</span>
  </a>
  <span class="text-sm font-semibold [text-wrap:balance] xs:px-4">
    Page {currentPage} of {totalPages}
  </span>
  <a
    href={`/${year}/${season}/${week}?page=${currentPage + 1}`}
    class={buttonVariants({ variant: "outline", size: "icon" })}
    aria-disabled={currentPage === totalPages ? true : false}
    tabIndex={currentPage === totalPages ? -1 : undefined}
  >
    <ChevronRight />
    <span class="sr-only">Go to next page</span>
  </a>
  <a
    href={`/${year}/${season}/${week}?page=${totalPages}`}
    class={buttonVariants({ variant: "outline", size: "icon" })}
    aria-disabled={currentPage === totalPages ? true : false}
    tabIndex={currentPage === totalPages ? -1 : undefined}
  >
    <DoubleArrowRight />
    <span class="sr-only">Go to last page</span>
  </a>
</div>

<AnimeList {rankings} week={parseInt(week)} />
