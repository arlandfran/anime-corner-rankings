<script lang="ts">
  import { page } from "$app/stores";

  let { year, season, week } = $page.params;
</script>

<h1 class="text-center capitalize">{season} {year} week - {week}</h1>
