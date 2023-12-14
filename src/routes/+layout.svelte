<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/ui/header.svelte";
  import "../app.pcss";
</script>

<ModeWatcher />
<Header />

<slot />
