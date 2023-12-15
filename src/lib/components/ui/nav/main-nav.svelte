<script lang="ts">
  import { links } from "$lib/config/site";
  import * as Menubar from "$lib/components/ui/menubar";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
</script>

<Menubar.Root class="hidden sm:flex">
  {#each Object.keys(links) as year}
    <Menubar.Menu>
      <Menubar.Trigger>
        {year}
      </Menubar.Trigger>
      <Menubar.Content>
        {#each Object.keys(links[year]) as season}
          <Menubar.Sub>
            <Menubar.SubTrigger class="capitalize">
              {season}
            </Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.RadioGroup value={$page.url.pathname}>
                <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
                {#each Array.from({ length: links[year][season] }) as _, i}
                  <Menubar.RadioItem
                    value={`/${year}/${season}/${i + 1}`}
                    on:click={async () => {
                      await goto(`/${year}/${season}/${i + 1}`);
                    }}
                  >
                    Week {i + 1}
                  </Menubar.RadioItem>
                {/each}
              </Menubar.RadioGroup>
            </Menubar.SubContent>
          </Menubar.Sub>
        {/each}
      </Menubar.Content>
    </Menubar.Menu>
  {/each}
</Menubar.Root>
