<script lang="ts">
  import { page } from "$app/stores";
  import AnimeList from "$lib/components/anime-list.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import { links } from "$lib/config/site";
  import { capitalize } from "$lib/utils";
  import { ChevronLeft, ChevronRight } from "radix-icons-svelte";
  import type { PageData } from "./$types";
  import * as Pagination from "$lib/components/ui/pagination";
  import { isDesktop } from "$lib/stores";
  import { goto } from "$app/navigation";

  export let data: PageData;

  $: ({ year, season, week } = $page.params);
  $: ({ rankings, count } = data);
  $: currentPage = parseInt(($page.url.searchParams.get("page") as string) ?? 1);
  $: maxWeek = links[year][season];
  $: siblingCount = $isDesktop ? 1 : 0;
</script>

<svelte:head>
  <title>
    {year}
    {capitalize(season)} Week {week} - Anime Corner Rankings
  </title>
  <meta
    name="description"
    content={`The results of Week ${week} ${capitalize(season)} ${year} from Anime Corner`}
  />
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
  <Pagination.Root {count} {siblingCount} perPage={10} let:pages>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton
          on:click={() => {
            goto(`/${year}/${season}/${week}/?page=${currentPage - 1}`);
          }}
        />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link
              {page}
              isActive={currentPage == page.value}
              on:click={() => {
                goto(`/${year}/${season}/${week}/?page=${page.value}`);
              }}
            >
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton
          on:click={() => {
            goto(`/${year}/${season}/${week}/?page=${currentPage + 1}`);
          }}
        />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>

<AnimeList {rankings} week={parseInt(week)} />
