<script lang="ts">
  import Button from "./button/button.svelte";
  import { Enter, GithubLogo } from "radix-icons-svelte";
  import ThemeToggle from "./theme-toggle.svelte";
  import AboutDialog from "./about-dialog.svelte";
</script>

<header class="sticky top-0 z-10 w-full bg-background/80 py-4 backdrop-blur-sm">
  <div class="container flex h-16 items-center justify-between shadow-md">
    <!-- placeholder mobile nav menu -->
    <Button variant="ghost" size="icon" class="sm:hidden">
      <Enter />
    </Button>
    <a
      href="/"
      class="hidden rounded-sm bg-transparent px-3 py-1 align-middle text-sm font-semibold outline-none hover:underline focus-visible:bg-accent focus-visible:ring-1 focus-visible:ring-ring sm:block"
      >Anime Corner Rankings</a
    >
    <div class="flex gap-2">
      <AboutDialog />
      <Button
        href="https://github.com/arlandfran/anime-corner-rankings"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        size="icon"
      >
        <GithubLogo />
        <span class="sr-only">Open Github repo</span>
      </Button>
      <ThemeToggle />
    </div>
  </div>
</header>
