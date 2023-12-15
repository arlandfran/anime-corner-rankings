<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import { ModeWatcher } from "mode-watcher";
  import "../app.pcss";
</script>

<ModeWatcher />
<Header />
<main
  class="flex min-w-[14rem] max-w-xl flex-col items-center justify-center gap-4 pb-8 pt-4 xs:container"
>
  <slot />
</main>
