<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import { ModeWatcher } from "mode-watcher";
  import "../app.pcss";
</script>

<ModeWatcher />
<Header />

<slot />
