<script lang="ts">
  import { page } from "$app/stores";
  import { buttonVariants } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  export let href: string;
  export let open: boolean;

  let variant: "default" | "ghost" = $page.url.pathname === href ? "default" : "ghost";
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<a
  {href}
  on:click={() => (open = false)}
  class={cn(buttonVariants({ variant: variant, size: "icon" }), className)}
  {...$$restProps}
>
  <slot />
</a>
