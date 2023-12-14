<script lang="ts">
  import { page } from "$app/stores";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import * as Sheet from "$lib/components/ui/sheet";
  import { links } from "$lib/config/site";
  import { Enter } from "svelte-radix";
  import MobileLink from "./mobile-link.svelte";

  $: ({ year, season, week } = $page.params);
  let open = false;
</script>

<Sheet.Root bind:open>
  <Sheet.Trigger class={buttonVariants({ variant: "ghost", size: "icon", class: "sm:hidden" })}>
    <Enter size={15} />
    <span class="sr-only">Open side navigation</span>
  </Sheet.Trigger>
  <Sheet.Content side="left">
    <Sheet.Header>
      <Sheet.Title>
        <a href="/" class="hover:underline" on:click={() => (open = false)}>Anime Corner Rankings</a
        >
      </Sheet.Title>
      <Sheet.Description>
        Built by <a
          href="http://github.com/arlandfran"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold underline">arlandfran</a
        >.
      </Sheet.Description>
    </Sheet.Header>
    <div class="flex flex-col">
      <p class="text-sm">Currently viewing:</p>
      <span class="text-sm font-medium capitalize text-foreground">
        {season}
        {year} - week {week}
      </span>
    </div>
    <div class="my-4 h-[calc(100vh-12rem)] space-y-4 overflow-auto pb-10">
      {#each Object.keys(links).reverse() as year}
        {#each Object.keys(links[year]).reverse() as season}
          <h3 class="font-semibold capitalize">{season} '{year.slice(2)}</h3>
          <Separator />
          <div class="flex flex-wrap gap-4 pl-1">
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each Array.from({ length: links[year][season] }) as _, i}
              <MobileLink href={`/${year}/${season}/${i + 1}`} bind:open>
                {i + 1}
              </MobileLink>
            {/each}
          </div>
        {/each}
      {/each}
    </div>
  </Sheet.Content>
</Sheet.Root>
