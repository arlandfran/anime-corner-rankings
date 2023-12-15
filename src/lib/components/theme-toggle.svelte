<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";
  import { Moon, Sun } from "radix-icons-svelte";
</script>

<Button on:click={toggleMode} variant="ghost" size="icon">
  <Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  <span class="sr-only">Toggle theme</span>
</Button>
