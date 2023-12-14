<script lang="ts">
  import AboutDialog from "$lib/components/about-dialog.svelte";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";
  import { Button } from "$lib/components/ui/button";
  import { MainNav, MobileNav } from "$lib/components/ui/nav";
  import { Separator } from "$lib/components/ui/separator";
  import { GithubLogo } from "svelte-radix";
</script>

<header class="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm">
  <div class="container flex h-16 items-center justify-between gap-3 shadow-md sm:justify-center">
    <MobileNav />
    <a
      href="/"
      class="hidden rounded-sm bg-transparent px-3 py-1 align-middle text-sm font-semibold outline-none hover:underline focus-visible:bg-accent sm:block"
      >Anime Corner Rankings</a
    >
    <Separator orientation="vertical" class="hidden h-5 sm:block" />
    <MainNav />
    <Separator orientation="vertical" class="hidden h-5 sm:block" />
    <div class="flex gap-2">
      <AboutDialog />
      <Button
        href="https://github.com/arlandfran/anime-corner-rankings"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        size="icon"
      >
        <GithubLogo size={15} tabindex={-1} />
        <span class="sr-only">Open Github repo</span>
      </Button>
      <ThemeToggle />
    </div>
  </div>
</header>
