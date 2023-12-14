<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ year, season, week } = $page.params);
</script>

<h1 class="text-center capitalize">{season} {year} - week {week}</h1>

<p class="text-center">Count: {data.count}</p>
